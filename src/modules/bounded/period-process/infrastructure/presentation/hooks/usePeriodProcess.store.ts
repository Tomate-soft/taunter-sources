import { useState } from "react";
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
        setIsLoading(true);
        try {
            console.log("[usePeriodProcess] handleMonthChange: fetching month", month);
            const monthlyPeriods = await __getMonthlyPeriods(month);
            console.log("[usePeriodProcess] handleMonthChange: received", monthlyPeriods?.length, "periods");
            if (monthlyPeriods && monthlyPeriods.length > 0) {
                console.log("[usePeriodProcess] first period sample:", JSON.stringify(monthlyPeriods[0], null, 2));
            }
            setPeriods(monthlyPeriods);
        } catch (error) {
            console.error("[usePeriodProcess] handleMonthChange ERROR:", error);
        } finally {
            setIsLoading(false);
        }
    };
    

    const postProcessing = async (fetchedPeriods: Period[]) => {
        console.log("Post-processing fetched periods:", fetchedPeriods);
        await __postProcessPeriods(fetchedPeriods);
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

    
    return { getMonthly, periods, selectedMonth, handleMonthChange, isLoading, postProcessing };
    };
