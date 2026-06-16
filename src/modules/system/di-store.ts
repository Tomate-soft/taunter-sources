import {create} from 'zustand';
import { periodServiceContainer } from '../bounded/shared/infrastructure/serviceContainer';
import { printingServiceContainer } from '../shared/printing/infrastructure/printingServiceContainer';

interface DIStore {
    periodApp: any; 
    printingApp: any;
}

export const useDIStore = create<DIStore>(() => ({
    periodApp: periodServiceContainer, 
    printingApp: printingServiceContainer,
}));