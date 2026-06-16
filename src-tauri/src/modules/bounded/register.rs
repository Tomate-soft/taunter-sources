use crate::modules::bounded::period::core::domain::entities::operating_period::OperatingPeriod;

#[tauri::command]
pub fn get_period_by_id_command(id: String) -> Result<OperatingPeriod, String> {
    crate::modules::bounded::period::register::get_period_by_id_command(id)
}

#[tauri::command]
pub fn get_monthly_periods_command(month: String) -> Result<Vec<OperatingPeriod>, String> {
    crate::modules::bounded::period::register::get_monthly_periods_command(month)
}

#[tauri::command]
pub fn post_process_period_command(periods: Vec<OperatingPeriod>) -> Result<(), String> {
    crate::modules::bounded::period::register::post_process_period_command(periods)
}
