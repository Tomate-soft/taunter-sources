import { Period } from "../../../../core/domain/entities/Period";
import PeriodDetailsForm from "../period-details-form/period-details-form";
import styles from './process_form.module.css';

interface ProcessFormProps {
    editablePeriods: Period[];
    handleClosureChange: (index: number, field: string, value: number) => void;
    currentEditableTotal: number;
    activePeriod?: number | null;
}

export function ProcessForm({ editablePeriods, handleClosureChange, currentEditableTotal, activePeriod }: ProcessFormProps) {
    return (
         <div className={styles.container}>
            <PeriodDetailsForm 
                editablePeriods={editablePeriods}
                handleClosureChange={handleClosureChange}
                currentEditableTotal={currentEditableTotal}
                activePeriod={activePeriod}
            />
        </div>
    )
}