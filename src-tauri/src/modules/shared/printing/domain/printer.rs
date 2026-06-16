pub trait PrinterRepository {
    fn print_raw(&self, printer_name: &str, data: &[u8]) -> Result<(), String>;
}
