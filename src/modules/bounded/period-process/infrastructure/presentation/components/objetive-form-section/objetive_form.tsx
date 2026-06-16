import { Period } from "../../../../core/domain/entities/Period";
import { LimitCountMessage } from "../exceptions-messages/limit_count_message";
import ObjetiveInvalidMessage from "../exceptions-messages/objetive_invalid";
import CurrencyInput from "../currency-input/CurrencyInput";
import styles from './objetive_form.module.css';

interface ObjetiveFormSectionProps {
    objectiveAmount: number | string;
    isObjectiveInvalid: boolean;
    isSumExceeding: boolean;
    handleObjectiveChange: (valueStr: string) => void;
    currentEditableTotal: number;
    periods: Period[];
}
export default function ObjetiveFormSection({ objectiveAmount, isObjectiveInvalid, isSumExceeding, handleObjectiveChange, currentEditableTotal, periods }: ObjetiveFormSectionProps){
    
    const formatCurrency = (val: number) => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(val);
    
    return (
        <section className={styles.totalContainer}>
            <label>
                    <span>Monto objetivo</span>
                    <div className={styles.inputWrapper}>
                        <CurrencyInput 
                            value={Number(objectiveAmount) || 0} 
                            onChange={(val) => handleObjectiveChange(val.toString())} 
                            placeholder="Ingresar meta..."
                            className={isObjectiveInvalid ? styles.inputError : ''}
                        />
                    </div>
                </label>
                    { isObjectiveInvalid && <ObjetiveInvalidMessage /> }
                   <LimitCountMessage isSumExceeding={isSumExceeding} currentEditableTotal={currentEditableTotal} />
                    {/* <label>
                        <span>Total Mensual original</span>
                        <input 
                        type="text" 
                        value={formatCurrency((periods || []).reduce((total, period) => total + (period?.operational_closure?.totalSellsAmount ?? 0), 0))} 
                        readOnly 
                    />
                    </label> */}
                    {/* <label>
                        <span>Total Efectivo</span>
                        <input 
                        type="text" 
                        value={formatCurrency((periods || []).reduce((total, period) => total + (period?.operational_closure?.totalCashInAmount ?? 0), 0))} 
                        readOnly 
                    />
                    </label> */}
                </section>
    )
} 