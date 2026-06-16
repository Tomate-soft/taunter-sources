import { useState } from 'react';
import { useDIStore } from '../../../system/di-store';

export function usePrinting() {
  // Access printingApp container from DI store
  const printingApp = useDIStore((state: any) => state.printingApp);
  const [isPrinting, setIsPrinting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const printTestTicket = async (printerName: string = 'Default_Printer') => {
    if (!printingApp) {
      setError('El contenedor de servicios de impresión no está inicializado.');
      return;
    }
    setIsPrinting(true);
    setError(null);
    setSuccess(false);
    try {
      await printingApp.printHelloWorld(printerName);
      setSuccess(true);
      // Reset success state after a delay
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err?.message || String(err));
    } finally {
      setIsPrinting(false);
    }
  };

  return { printTestTicket, isPrinting, error, success };
}
