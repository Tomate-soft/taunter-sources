import { Period } from "../../domain/entities/Period";

export interface PeriodAppService {
    getMonthly(month: string): Promise<Period[]>;
    calculateMonthlyTotals(periods: Period[]): Promise<number>;
    calculateCashMonthlyTotals(periods: Period[]): Promise<number>;
    postProcess(periods: Period[]): Promise<void>;
}