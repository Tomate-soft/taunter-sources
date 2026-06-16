import { useState } from 'react';
import { getDayNumber } from '../../../../../../common/libs/date-time-management';
import { Period } from '../../../../core/domain/entities/Period';
import styles from './process_view_main.module.css';
import { MonthSelector } from '../MonthSelector';
import ObjetiveFormSection from '../objetive-form-section/objetive_form';
import { ProcessForm } from '../process-form/process_form';
import { PrintTestButton } from '../../../../../../shared/printing/presentation/PrintTestButton';
import { PeriodSkeletonGrid } from '../period-details-form/PeriodSkeleton';

interface ProcessViewMainProps {
    editablePeriods: Period[];
    periods: Period[];
    selectedMonth: string | null;
    handleMonthChange: (month: string) => void;
    objectiveAmount: number | string;
    isObjectiveInvalid: boolean;
    isSumExceeding: boolean;
    handleObjectiveChange: (value: number | string) => void;
    currentEditableTotal: number;
    handleClosureChange: (index: number, field: string, value: any) => void;
    isLoading: boolean;
    handleReset: () => void;
    processRequest: () => void;
    hasMissingClosure: boolean;
    missingClosureDays: string[];
}

export const ProcessViewMain = (props: ProcessViewMainProps) => {

    const [activePeriod, setActivePeriod] = useState<number | null>(null);

    const scrollToDay = (index: number) => {
    setActivePeriod(index);
    const element = document.getElementById(`period-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

    const { 
        editablePeriods,
        periods,
        selectedMonth,
        handleMonthChange,
        objectiveAmount,
        isObjectiveInvalid,
        isSumExceeding,
        handleObjectiveChange,
        currentEditableTotal,
        handleClosureChange,
        isLoading,
        handleReset,
        processRequest,
        hasMissingClosure,
        missingClosureDays,
        } = props;

    return (
         <main className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.toolsSection}>
            <div className={styles.navSection}>
                <label className={styles.searchLabel}>Acceso Rápido (Días)</label>
                <div className={styles.dayGrid}>
                    {editablePeriods.map((p, i) => {
                        const day = getDayNumber(p.created_at || '') || (i + 1);
                        return (
                            <button 
                                key={i} 
                                className={`${styles.dayButton} ${activePeriod === i ? styles.dayButtonActive : ''}`}
                                onClick={() => scrollToDay(i)}
                                title={`Ir al día ${p.created_at}`}
                            >
                                {day}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
        <div className={styles.heroSection}>
            <p className={styles.displayTotal}>
            {new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(periods.reduce((sum, period) => sum + (period?.operational_closure?.totalCashInAmount ?? 0), 0))}
            </p>
            <p className={styles.subheadline}>Efectivo Total</p>
        </div>
        <div className={styles.configSection}>
            <MonthSelector  
                value={selectedMonth || 'Seleccion'}
                onChange={handleMonthChange}
            />
            <ObjetiveFormSection 
                objectiveAmount={objectiveAmount}
                isObjectiveInvalid={isObjectiveInvalid}
                isSumExceeding={isSumExceeding}
                handleObjectiveChange={handleObjectiveChange}
                currentEditableTotal={currentEditableTotal}
                periods={periods}
            />
            <div className={styles.sidebarFooter}>
                {hasMissingClosure && (
                    <div className={styles.missingClosureWarning}>
                        <span className={styles.missingClosureIcon}>⚠</span>
                        <span>
                            {missingClosureDays.length === 1
                                ? `Falta cerrar: día ${missingClosureDays[0]}`
                                : `Faltan por cerrar: días ${missingClosureDays.join(', ')}`
                            }
                        </span>
                    </div>
                )}
                <button 
                    type="button" 
                    onClick={handleReset}
                    className="btn-ghost"
                    style={{ width: '100%', marginBottom: '8px' }}
                >
                    Reiniciar valores
                </button>
                <button 
                    type="button" 
                    onClick={() => processRequest()}
                    className="btn-primary"
                    disabled={hasMissingClosure}
                    style={{ width: '100%', padding: '14px', marginBottom: '12px', opacity: hasMissingClosure ? 0.5 : 1, cursor: hasMissingClosure ? 'not-allowed' : 'pointer' }}
                >
                    Procesar
                </button>
                <PrintTestButton />
            </div>
        </div>
      </aside>
      <section className={styles.workArea}>
        {isLoading ? (
            <PeriodSkeletonGrid />
        ) : (
            <ProcessForm 
                editablePeriods={editablePeriods}
                handleClosureChange={handleClosureChange}
                currentEditableTotal={currentEditableTotal}
                activePeriod={activePeriod}
            />
        )}
      </section>
    </main>
    )
}