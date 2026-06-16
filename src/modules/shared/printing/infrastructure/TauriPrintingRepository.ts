import { invoke } from '@tauri-apps/api/core';
import { PrinterRepository } from '../domain/PrintingService';

export class TauriPrintingRepository implements PrinterRepository {
  async printHelloWorld(printerName: string): Promise<void> {
    try {
      await invoke('print_hello_world_command', { printerName });
    } catch (error) {
      console.error('Error invoking print_hello_world_command:', error);
      throw new Error(String(error) || 'Failed to print Hello World ticket');
    }
  }
}
