use crate::modules::shared::system_info::domain::system_info::SystemInfo;

#[tauri::command]
pub fn get_system_info_command<R: tauri::Runtime>(app_handle: tauri::AppHandle<R>) -> Result<SystemInfo, String> {
	crate::modules::shared::system_info::presentation::commands::get_system_info_command(app_handle)
}

#[tauri::command]
pub fn print_hello_world_command<R: tauri::Runtime>(app_handle: tauri::AppHandle<R>, printer_name: String) -> Result<(), String> {
	crate::modules::shared::printing::presentation::commands::print_hello_world_command(app_handle, printer_name)
}
