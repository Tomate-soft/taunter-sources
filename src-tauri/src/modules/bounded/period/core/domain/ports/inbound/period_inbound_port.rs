use crate::modules::bounded::period::core::domain::{
	entities::operating_period::OperatingPeriod,
	errors::PeriodError,
};

pub trait PeriodInboundPort: Send + Sync {
	fn get_period_by_id(&self, id: String) -> Result<OperatingPeriod, PeriodError>;
	fn get_monthly_periods(&self, month: String) -> Result<Vec<OperatingPeriod>, PeriodError>;
	fn post_process_periods(&self, periods: Vec<OperatingPeriod>) -> Result<(), PeriodError>;
}
