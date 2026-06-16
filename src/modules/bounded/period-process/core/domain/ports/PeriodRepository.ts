import { Period } from "../entities/Period";

export interface PeriodRepository {
    findByMonth(month: string): Promise<Period[]>;
    postProcess(periods: Period[]): Promise<void>;
}