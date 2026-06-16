import { PrinterRepository } from '../domain/PrintingService';

export class PrintHelloWorldUseCase {
  constructor(private readonly printerRepository: PrinterRepository) {}

  async execute(printerName: string): Promise<void> {
    if (!printerName) {
      printerName = 'Default_Thermal_Printer';
    }
    return this.printerRepository.printHelloWorld(printerName);
  }
}
