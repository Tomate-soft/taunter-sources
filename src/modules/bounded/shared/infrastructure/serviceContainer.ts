import periodUseCases from "../../period-process/core/application/services/periodUseCases";
import { Period } from "../../period-process/core/domain/entities/Period";
import { recountDomainService } from "../../period-process/core/domain/services/RecountDomainService";
import { periodCommandRepository } from "../../period-process/infrastructure/repositories/periodCommandRepository";

interface PeriodServiceContainer {
    getMonthlyPeriods(month: string): Promise<Period[]>;
    postProcessPeriods(periods: Period[]): Promise<void>;
}

const repository = periodCommandRepository()
const periodDomainService = recountDomainService(repository)
const periodAppService = periodUseCases(periodDomainService)


export const periodServiceContainer : PeriodServiceContainer = { 
        getMonthlyPeriods: periodAppService.getMonthly,
        postProcessPeriods: periodAppService.postProcess
    }
