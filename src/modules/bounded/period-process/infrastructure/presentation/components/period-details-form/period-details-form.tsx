import { Period } from "../../../../core/domain/entities/Period";
import CurrencyInput from "../currency-input/CurrencyInput";
import styles from './period_details_form.module.css';

interface PeriodDetailsFormProps {
    editablePeriods: Period[];
    handleClosureChange: (index: number, field: string, value: number) => void;
    currentEditableTotal: number;
    activePeriod?: number | null;
    onSelectPeriod?: (index: number) => void;
}

export default function PeriodDetailsForm({ editablePeriods, handleClosureChange, currentEditableTotal, activePeriod, onSelectPeriod }: PeriodDetailsFormProps) {
    return (
        <section className={styles.periodsContainer}>
            {
                editablePeriods?.map((period, i) => {
                    const index = (period as any).originalIndex ?? i;
                    const isActive = index === activePeriod;
                    const periodAmount = period?.operational_closure?.totalCashInAmount ?? 0;
                    const percentage = currentEditableTotal > 0 ? (periodAmount / currentEditableTotal) * 100 : 0;
                    
                    const formatCurrency = (val: number) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val);
                    const invoicedTotal = (period?.invoiced_accounts || []).reduce((acc, account) => acc + (parseFloat(account.check_total) || 0), 0);

                    return (
                    <div key={period?.id || index} id={`period-${index}`} className={`${styles.periodBlock} ${isActive ? styles.active : ''}`} onClick={() => onSelectPeriod?.(index)}>
                        <div className={styles.dayBadge}>
                            Día: {period?.created_at}
                        </div>
                        <label>
                            <span>Efectivo en Cierre</span>
                            <CurrencyInput 
                                value={periodAmount || 0} 
                                onChange={(val) => handleClosureChange(index, 'totalCashInAmount', val)}
                            />
                        </label>
                        <label>
                            <span> Total Facturado </span>
                            <input 
                                type="text" 
                                value={formatCurrency(invoicedTotal)} 
                                readOnly
                            />
                        </label>
                        <label>
                            <span> Porcentaje </span>
                            <input 
                                type="text" 
                                value={`${percentage.toFixed(2)}%`} 
                                readOnly
                            />
                        </label>
                        <label>
                            <span> Último folio facturado </span>
                            <input 
                                type="text" 
                                value={`${period?.highest_folio_number ?? 'No disponible'}`} 
                                readOnly
                            />
                        </label>
                    </div>  
                    )
                })
            }
        </section>
    );
}