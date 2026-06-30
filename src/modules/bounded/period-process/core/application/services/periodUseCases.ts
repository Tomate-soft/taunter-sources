import { Period } from "../../domain/entities/Period";
import { PeriodDomainService } from "../../domain/ports/inbound/PeriodService";
import { PeriodAppService } from "./periodAppService";

export default function periodUseCases (service: PeriodDomainService): PeriodAppService {

    return {
        getMonthly: async (month: string) => {
                if (!month) month = service.getCurrentMonth();
                console.log("[periodUseCases] getMonthly: calling service.getMonthly for", month);
                const periods = await service.getMonthly(month);
                console.log("[periodUseCases] getMonthly: got", periods?.length, "periods from service");
                const result = await Promise.all(periods.map(async (period) => ({
                    ...period,
                    created_at: await service.formatShortDate(new Date(period.created_at))
                })));
                console.log("[periodUseCases] getMonthly: returning", result?.length, "periods");
                return result;
        },

        postProcess: async (periods: Period[]) => {
            return service.postProcess(periods);
        },
        calculateMonthlyTotals: async (periods: Period[]) => {
            return service.calculateMonthlyTotals(periods);
        },
        calculateCashMonthlyTotals: async (periods: Period[]) => {
            return service.calculateCashMonthlyTotals(periods);
        }   
    }
}