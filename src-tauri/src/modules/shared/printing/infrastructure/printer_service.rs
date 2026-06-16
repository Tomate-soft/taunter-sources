use crate::modules::shared::printing::domain::printer::PrinterRepository;
use std::fs::File;
use std::io::Write;
use std::net::{TcpStream, SocketAddr};
use std::time::Duration;

pub struct DefaultPrinterService;

impl DefaultPrinterService {
    pub fn new() -> Self {
        Self
    }
}

impl PrinterRepository for DefaultPrinterService {
    fn print_raw(&self, printer_name: &str, data: &[u8]) -> Result<(), String> {
        println!(
            "[PrinterService] Printing job received for printer/IP: '{}'. Data size: {} bytes.",
            printer_name,
            data.len()
        );

        // Always write to a debug file as a fallback/history
        let debug_file_path = "ticket_debug.bin";
        if let Ok(mut file) = File::create(debug_file_path) {
            let _ = file.write_all(data);
        }

        // Check if printer_name looks like an IP address
        // If it contains '.', we treat it as an IP/Hostname for network printing
        if printer_name.contains('.') {
            // Determine the full address (default to port 9100 for raw printing if not specified)
            let addr_str = if printer_name.contains(':') {
                printer_name.to_string()
            } else {
                format!("{}:9100", printer_name)
            };

            println!("[PrinterService] Attempting network print to {}", addr_str);

            // Parse socket address
            let socket_addr = addr_str
                .parse::<SocketAddr>()
                .map_err(|e| format!("Formato de IP inválido: {}. Error: {}", addr_str, e))?;

            let mut stream = TcpStream::connect_timeout(&socket_addr, Duration::from_secs(4))
                .map_err(|e| format!("Error de conexión o timeout con {}: {}", addr_str, e))?;

            stream
                .write_all(data)
                .map_err(|e| format!("Error al escribir datos en {}: {}", addr_str, e))?;

            stream
                .flush()
                .map_err(|e| format!("Error de flush en {}: {}", addr_str, e))?;

            println!("[PrinterService] Impresión en red enviada con éxito a {}", addr_str);
            return Ok(());
        }

        // If it's a default/named local printer, we only write to the bin file for now
        if printer_name == "Default_Printer" || printer_name.is_empty() {
            println!("[PrinterService] Ejecutando en modo simulación (se guardó en ticket_debug.bin).");
            return Ok(());
        }

        Err(format!(
            "Impresora '{}' no reconocida. Introduce una IP de red (ej. 192.168.1.100) para imprimir.",
            printer_name
        ))
    }
}
