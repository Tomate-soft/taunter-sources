import { useState, useEffect } from 'react';
import { usePrinting } from './usePrinting';

export function PrintTestButton() {
  const { printTestTicket, isPrinting, error, success } = usePrinting();
  const [printerIp, setPrinterIp] = useState(() => {
    return localStorage.getItem('printing_target_ip') || '192.168.1.100';
  });

  useEffect(() => {
    localStorage.setItem('printing_target_ip', printerIp);
  }, [printerIp]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', marginTop: '8px' }}>
      <label style={{ fontSize: '12px', color: 'var(--color-cool-gray)', display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
        <span>IP Impresora Red:</span>
        <input
          type="text"
          className="input-elevated"
          value={printerIp}
          onChange={(e) => setPrinterIp(e.target.value)}
          placeholder="Ej. 192.168.1.100 o 192.168.1.100:9100"
          style={{ width: '100%', padding: '8px 12px', fontSize: '13px' }}
        />
      </label>
      <button
        type="button"
        className="btn-primary"
        onClick={() => printTestTicket(printerIp)}
        disabled={isPrinting}
        style={{
          width: '100%',
          padding: '12px 18px',
          fontSize: '14px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: isPrinting ? 0.7 : 1,
          cursor: isPrinting ? 'not-allowed' : 'pointer'
        }}
      >
        {isPrinting ? 'Enviando a impresora...' : 'Imprimir Ticket Prueba'}
      </button>
      {success && (
        <span style={{ fontSize: '12px', color: 'var(--color-accent-teal)', textAlign: 'center' }}>
          ¡Ticket enviado con éxito! (Ver ticket_debug.bin)
        </span>
      )}
      {error && (
        <span style={{ fontSize: '12px', color: 'var(--color-incandescent-orange)', textAlign: 'center', wordBreak: 'break-word' }}>
          Error: {error}
        </span>
      )}
    </div>
  );
}
