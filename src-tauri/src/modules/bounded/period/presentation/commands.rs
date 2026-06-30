use crate::modules::bounded::period::{
	core::{
		application::PeriodApplicationServiceInterface,
		domain::entities::operating_period::OperatingPeriod,
	},
	infrastructure::build_period_application_service,
};

fn get_period_api_base_url() -> String {
	std::env::var("PERIOD_API_BASE_URL").unwrap_or_else(|_| "https://internal.gateway.tomatesoft.com/api/v1".to_string())
}

fn get_taunter_api_base_url() -> String {
	std::env::var("TAUNTER_API_BASE_URL").unwrap_or_else(|_| "https://internal.gateway.tomatesoft.com/api/v1".to_string())
}

pub fn get_period_by_id_command(id: String) -> Result<OperatingPeriod, String> {
	let service = build_period_application_service(get_period_api_base_url());
	service.get_period_by_id(id).map_err(|error| error.to_string())
}

// pub fn get_all_periods_command() -> Result<Vec<OperatingPeriod>, String> {
// 	let service = build_period_application_service(get_period_api_base_url());
// 	service.get_all().map_err(|error| error.to_string())
// }

pub fn get_monthly_periods_command(month: String) -> Result<Vec<OperatingPeriod>, String> {
	println!("[commands] get_monthly_periods_command called with month='{}'", month);
	let service = build_period_application_service(get_period_api_base_url());
	let result = service.get_monthly_periods(month.clone());
	match &result {
		Ok(periods) => println!("[commands] get_monthly_periods_command SUCCESS: {} periods", periods.len()),
		Err(error) => eprintln!("[commands] get_monthly_periods_command ERROR for month='{}': {}", month, error),
	}
	result.map_err(|error| error.to_string())
}

pub fn post_process_period_command(periods: Vec<OperatingPeriod>) -> Result<(), String> {
	let service = build_period_application_service(get_taunter_api_base_url());
	service.post_process_periods(periods).map_err(|error| error.to_string())
}