import { useState } from 'react';
import { useRecountProcess } from '../modules/bounded/period-process/infrastructure/presentation/hooks/useRecountProcess';
import { ProcessViewMain } from '../modules/bounded/period-process/infrastructure/presentation/components/process-view-main/process_view_main';


export default function RecountProcess() {
  // ... (rest of the component)
  const { periods,
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
        } = useRecountProcess();
  

  return <ProcessViewMain 
            editablePeriods={editablePeriods}
            periods={periods}
            selectedMonth={selectedMonth}
            handleMonthChange={handleMonthChange}
            objectiveAmount={objectiveAmount}
            isObjectiveInvalid={isObjectiveInvalid}
            isSumExceeding={isSumExceeding}
            handleObjectiveChange={handleObjectiveChange}
            currentEditableTotal={currentEditableTotal}
            handleClosureChange={handleClosureChange}
            isLoading={isLoading}
            handleReset={handleReset}
            processRequest={processRequest}
            hasMissingClosure={hasMissingClosure}
            missingClosureDays={missingClosureDays}
        />;
}
