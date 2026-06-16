use crate::modules::shared::printing::{
    application::print_hello_world::PrintHelloWorldUseCase,
    infrastructure::printer_service::DefaultPrinterService,
};

pub fn print_hello_world_command<R: tauri::Runtime>(
    _app_handle: tauri::AppHandle<R>,
    printer_name: String,
) -> Result<(), String> {
    let service = DefaultPrinterService::new();
    let use_case = PrintHelloWorldUseCase::new(service);
    
    use_case.execute(&printer_name)
}
