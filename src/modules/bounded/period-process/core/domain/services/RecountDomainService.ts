import { Period } from "../entities/Period";
import { PeriodRepository } from "../ports/PeriodRepository";
import { PeriodDomainService } from "../ports/inbound/PeriodService";

export function recountDomainService(repository: PeriodRepository): PeriodDomainService {

    const state: { periods: Period[] } = {
        periods: []
    }
    const getMonthly = async (month: string) => {
        try {
            const periods = await repository.findByMonth(month);
            state.periods = periods;
            return periods;
        } catch (error) {
            console.error("Error fetching periods:", error);
            throw new Error("Failed to fetch periods");
        }
    }

    const getCurrentMonth = (): string => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        return `${year}-${month}`;
    };

    const formatISODate = (date: Date): string => {
        return date.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        });
    };

    const formatShortDate = async (date: Date | string): Promise<string> => {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return dateObj.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "short",
            day: "numeric"
        });
    };

    const calculateMonthlyTotals = async (periods: Period[]): Promise<number> => {
        return periods.reduce((total, period) => total + (period?.operational_closure?.totalSellsAmount ?? 0), 0);
    }

    const calculateCashMonthlyTotals = async (periods: Period[]): Promise<number> => {
        return periods.reduce((total, period) => total + (period?.operational_closure?.totalCashInAmount ?? 0), 0);
    }

    const postProcess = async (periods: Period[]): Promise<void> => {
        await repository.postProcess(periods);
    } 

    return {
        getMonthly,
        getCurrentMonth,
        formatISODate,
        formatShortDate,
        calculateMonthlyTotals,
        calculateCashMonthlyTotals
        ,postProcess
    }
}