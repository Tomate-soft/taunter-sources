export interface PrinterRepository {
  printHelloWorld(printerName: string): Promise<void>;
}
