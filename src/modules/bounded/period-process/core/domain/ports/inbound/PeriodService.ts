import { Period } from "../../entities/Period";

export interface PeriodDomainService {
    getMonthly(month: string): Promise<Period[]>;
    getCurrentMonth(): string;
    formatISODate(date: Date): string;
    formatShortDate(date: Date | string): Promise<string>;
    calculateMonthlyTotals(periods: Period[]): Promise<number>;
    calculateCashMonthlyTotals(periods: Period[]): Promise<number>;
    postProcess(periods: Period[]): Promise<void>;
}