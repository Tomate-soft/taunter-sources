import { create } from "zustand";
import { Period } from "../../../core/domain/entities/Period";

interface PeriodState {
    periods: any[]; // Replace 'any' with the actual type of your periods
    setPeriods: (periods: Period[]) => void;
}


export const usePeriodStore = create<PeriodState>((set) =>{ 
    return {
    periods: [],
    setPeriods: async (periods: Period[]) => {
            set({ periods });
    },
}});