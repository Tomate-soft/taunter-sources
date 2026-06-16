import { useEffect, useState } from "react";
import { usePeriodStore } from "../store/usePeriodStore";
import { Period } from "../../../core/domain/entities/Period";
import { useDIStore } from "../../../../../system/di-store";

interface UseProcess {
    getMonthly: (month: string) => Promise<void>;
    periods: Period[]; 
    selectedMonth: string | null;
    handleMonthChange: (month: string) => Promise<void>;
    isLoading: boolean;
    postProcessing: (fetchedPeriods: Period[]) => void;
}

export const useProcess = (): UseProcess => {
    const __getMonthlyPeriods = useDIStore((state) => state.periodApp.getMonthlyPeriods);
    const __postProcessPeriods = useDIStore((state) => state.periodApp.postProcessPeriods);
    
    const { setPeriods, periods } = usePeriodStore();

    const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleMonthChange = async (month: string) => {
        setSelectedMonth(month);
    };
    

    const postProcessing = async (fetchedPeriods: Period[]) => {
        console.log("Post-processing fetched periods:", fetchedPeriods);
        await __postProcessPeriods(fetchedPeriods);
        
        
        // return fetchedPeriods; 
    }

    const getMonthly = async (month?: string) => {
        setIsLoading(true);
        try {
            const monthlyPeriods = await __getMonthlyPeriods(month);
            setPeriods(monthlyPeriods);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getMonthly(selectedMonth || "");
    }, [selectedMonth]);

    
    return { getMonthly, periods, selectedMonth, handleMonthChange, isLoading, postProcessing };
    };
