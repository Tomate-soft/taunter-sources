import { Period } from "../../domain/entities/Period";
import { PeriodDomainService } from "../../domain/ports/inbound/PeriodService";
import { PeriodAppService } from "./periodAppService";

export default function periodUseCases (service: PeriodDomainService): PeriodAppService {

    return {
        getMonthly: async (month: string) => {
                if (!month) month = service.getCurrentMonth();
                const periods = await service.getMonthly(month);
                // hay que sacar un mapper externo para hacer esto
                return Promise.all(periods.map(async (period) => ({
                    ...period,
                    created_at: await service.formatShortDate(new Date(period.created_at))
                })));
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