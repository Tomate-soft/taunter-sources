use crate::modules::bounded::period::core::domain::{
	entities::operating_period::OperatingPeriod,
};
use crate::modules::bounded::period::core::application::errors::PeriodApplicationError;

pub trait PeriodApplicationServiceInterface: Send + Sync {
	fn get_period_by_id(&self, id: String) -> Result<OperatingPeriod, PeriodApplicationError>;
	fn get_monthly_periods(&self, month: String) -> Result<Vec<OperatingPeriod>, PeriodApplicationError>;
	fn post_process_periods(&self, periods: Vec<OperatingPeriod>) -> Result<(), PeriodApplicationError>;
}
