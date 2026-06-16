use crate::modules::bounded::period::core::domain::entities::operating_period::OperatingPeriod;

pub fn get_period_by_id_command(id: String) -> Result<OperatingPeriod, String> {
    crate::modules::bounded::period::presentation::commands::get_period_by_id_command(id)
}

pub fn get_monthly_periods_command(month: String) -> Result<Vec<OperatingPeriod>, String> {
    crate::modules::bounded::period::presentation::commands::get_monthly_periods_command(month)
}

pub fn post_process_period_command(periods: Vec<OperatingPeriod>) -> Result<(), String> {
    crate::modules::bounded::period::presentation::commands::post_process_period_command(periods)
}
