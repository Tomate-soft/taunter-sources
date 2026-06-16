import { useEffect, useState } from "react";
import { Period } from "../../../core/domain/entities/Period";
import { useProcess } from "./usePeriodProcess.store";
import { getDayNumber } from "../../../../../common/libs/date-time-management";

interface UseRecountProcess {
    periods: Period[];
    selectedMonth: string | null;
    handleMonthChange: (month: string) => Promise<void>;
    editablePeriods: Period[];
    objectiveAmount: number | string;
    isObjectiveInvalid: boolean;
    isSumExceeding: boolean;
    handleClosureChange: (index: number, field: string, value: number) => void;
    handleObjectiveChange: (valueStr: string | number) => void;
    handleReset: () => void;
    currentEditableTotal: number;
    isLoading: boolean;
    processRequest: () => void;
    hasMissingClosure: boolean;
    missingClosureDays: string[];
}
  

export const useRecountProcess = (): UseRecountProcess => {

const { periods, selectedMonth, handleMonthChange, isLoading, postProcessing } = useProcess();
  
  const initialTotal = Number(((periods || []).reduce((total, period) => total + (period?.operational_closure?.totalCashInAmount ?? 0), 0)).toFixed(2));
  
  const [editablePeriods, setEditablePeriods] = useState(periods || []);
  const [objectiveAmount, setObjectiveAmount] = useState<number | string>(initialTotal || 0);

  useEffect(() => {
    setEditablePeriods(periods || []);
    const newTotal = Number(((periods || []).reduce((total, period) => total + (period?.operational_closure?.totalCashInAmount ?? 0), 0)).toFixed(2));
    setObjectiveAmount(newTotal || 0);
  }, [periods]);

  const currentEditableTotal = Number((editablePeriods.reduce((total, period) => total + (period?.operational_closure?.totalCashInAmount ?? 0), 0)).toFixed(2));
  const numericObjective = Number(objectiveAmount) || 0;
  
  // Validaciones
  // 1. El objetivo no debe ser mayor al total original
  const isObjectiveInvalid = objectiveAmount !== '' && numericObjective > initialTotal;
  
  // 2. La suma editada no debe superar al monto objetivo
  const isSumExceeding = currentEditableTotal > numericObjective;

  // 3. Periodos sin cierre operativo
  const missingClosurePeriods = (editablePeriods || []).filter(p => !p.operational_closure);
  const hasMissingClosure = missingClosurePeriods.length > 0;
  const missingClosureDays = missingClosurePeriods
    .map(p => getDayNumber(p.created_at) || '?')
    .sort((a, b) => parseInt(b) - parseInt(a));

  const handleClosureChange = (index: number, field: string, value: number) => {
    if (field === 'totalCashInAmount') {
      const targetTotal = Number(objectiveAmount) || initialTotal;
      
      // Calculamos el mínimo facturado para este periodo en específico
      const invoicedTotal = (editablePeriods[index]?.invoiced_accounts || []).reduce((acc, account) => acc + (parseFloat(account.check_total) || 0), 0);
      
      // Evitamos valores menores a lo facturado o mayores al objetivo total
      const clampedValue = Math.max(invoicedTotal, Math.min(value, targetTotal));

      const oldValue = editablePeriods[index]?.operational_closure?.totalCashInAmount ?? 0;
      const difference = clampedValue - oldValue;
      
      const otherPeriods = editablePeriods.filter((_, i) => i !== index);
      const sumOthers = otherPeriods.reduce((acc, p) => acc + (p?.operational_closure?.totalCashInAmount ?? 0), 0);

      const newPeriods = editablePeriods.map((period, i) => {
        if (i === index) {
          return {
            ...period,
            operational_closure: period.operational_closure ? {
              ...period.operational_closure,
              [field]: clampedValue
            } : undefined
          };
        } else {
          const currentAmount = period?.operational_closure?.totalCashInAmount ?? 0;
          // Si los demás están en 0, repartimos proporcionalmente en partes iguales
          const proportion = sumOthers > 0 ? (currentAmount / sumOthers) : (1 / otherPeriods.length);
          const adjustBy = difference * proportion;
          
          // Mínimo de los otros periodos
          const otherInvoicedTotal = (period?.invoiced_accounts || []).reduce((acc, account) => acc + (parseFloat(account.check_total) || 0), 0);
          let newAmount = Math.max(otherInvoicedTotal, currentAmount - adjustBy);

          return {
            ...period,
            operational_closure: period.operational_closure ? {
              ...period.operational_closure,
              [field]: Number(newAmount.toFixed(2))
            } : undefined
          };
        }
      });

      // Corrección de redondeo residual en los demás periodos
      const currentSum = newPeriods.reduce((acc, p) => acc + (p?.operational_closure?.totalCashInAmount ?? 0), 0);
      const diff = Number((targetTotal - currentSum).toFixed(2));
      
      if (diff !== 0 && otherPeriods.length > 0) {
        const fixIndex = newPeriods.findIndex((p, i) => i !== index && p.operational_closure);
        if (fixIndex !== -1 && newPeriods[fixIndex].operational_closure) {
          newPeriods[fixIndex].operational_closure!.totalCashInAmount = Number((newPeriods[fixIndex].operational_closure!.totalCashInAmount + diff).toFixed(2));
        }
      }

      setEditablePeriods(newPeriods);
    } else {
      const newPeriods = [...editablePeriods];
      if (newPeriods[index].operational_closure) {
        newPeriods[index] = {
          ...newPeriods[index],
          operational_closure: {
            ...newPeriods[index].operational_closure,
            [field]: value
          }
        };
      }
      setEditablePeriods(newPeriods);
    }
  };

  const handleObjectiveChange = (valueStr: string | number) => {
    setObjectiveAmount(valueStr);
    const newObjective = parseFloat(typeof valueStr === 'string' ? valueStr : valueStr.toString());

    if (valueStr !== '' && !isNaN(newObjective) && newObjective >= 0 && newObjective <= initialTotal) {
      if (initialTotal > 0) {
        const newPeriods = editablePeriods.map((period, i) => {
          // Usamos 'periods' e 'initialTotal' SIEMPRE como base para calcular el porcentaje.
          // Esto evita la pérdida de precisión matemática (que convierte los porcentajes en exactos 100% y 0%)
          // al no recalcular sobre números ya redondeados en cada tecla oprimida.
          const originalAmount = periods[i]?.operational_closure?.totalCashInAmount ?? 0;
          const percentage = originalAmount / initialTotal;
          const adjustedAmount = percentage * newObjective;

          return {
            ...period,
            operational_closure: period.operational_closure ? {
              ...period.operational_closure,
              totalCashInAmount: Number(adjustedAmount.toFixed(2))
            } : undefined
          };
        });

        // Ajustar pequeña diferencia de redondeo en el primer periodo si la suma no es exacta por los decimales
        const newSum = newPeriods.reduce((total, period) => total + (period?.operational_closure?.totalCashInAmount ?? 0), 0);
        const difference = Number((newObjective - newSum).toFixed(2));
        
        if (difference !== 0 && newPeriods.length > 0) {
          const validIndex = newPeriods.findIndex(p => p.operational_closure);
          if (validIndex !== -1 && newPeriods[validIndex].operational_closure) {
            newPeriods[validIndex].operational_closure!.totalCashInAmount = Number((newPeriods[validIndex].operational_closure!.totalCashInAmount + difference).toFixed(2));
          }
        }

        setEditablePeriods(newPeriods);
      }
    }
  };

  const handleReset = () => {
    setEditablePeriods(periods || []);
    setObjectiveAmount(initialTotal || 0);
  };

  const processRequest = () => {
    postProcessing(editablePeriods);
  }

  return {
    periods,
    selectedMonth,
    handleMonthChange,
    editablePeriods,
    objectiveAmount,
    isObjectiveInvalid,
    isSumExceeding,
    handleClosureChange,
    handleObjectiveChange,
    handleReset,
    currentEditableTotal,
    isLoading,
    processRequest,
    hasMissingClosure,
    missingClosureDays,
  };
}