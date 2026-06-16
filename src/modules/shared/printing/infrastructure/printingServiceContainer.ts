import { TauriPrintingRepository } from './TauriPrintingRepository';
import { PrintHelloWorldUseCase } from '../application/PrintHelloWorldUseCase';

const repository = new TauriPrintingRepository();
const printHelloWorldUseCase = new PrintHelloWorldUseCase(repository);

export const printingServiceContainer = {
  printHelloWorld: (printerName: string) => printHelloWorldUseCase.execute(printerName),
};
