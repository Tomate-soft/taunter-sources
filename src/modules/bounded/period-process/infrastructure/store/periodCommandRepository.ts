import { invoke } from '@tauri-apps/api/core';
import { Period } from '../../core/domain/entities/Period';
import { PeriodCommand } from '../../core/application/commands/period.commands';

export const periodCommandRepository = () => {
    return {
        findByMonth: async (month: string): Promise<Period[]> => {
            try {
                return await invoke<Period[]>(PeriodCommand.GET_MONTHLY, { month });
            } catch (error) {
                    console.error("Error fetching periods:", error);
            throw new Error("Failed to fetch periods");
        }
    }
}
}