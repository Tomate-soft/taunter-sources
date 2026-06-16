pub mod shared;
pub mod bounded;

use tauri::{Builder, Runtime};


/// Centraliza el registro de todos los comandos de nuestros módulos
pub fn register_features<R: Runtime>(builder: Builder<R>) -> Builder<R> {
    builder.invoke_handler(tauri::generate_handler![
        shared::register::get_system_info_command,
        shared::register::print_hello_world_command,
        bounded::register::get_period_by_id_command,
        bounded::register::get_monthly_periods_command,
        bounded::register::post_process_period_command
    ])
}
