use crate::modules::bounded::period::core::domain::{
	entities::operating_period::OperatingPeriod,
	errors::PeriodError,
	values::PeriodId,
};

pub trait PeriodRepository: Send + Sync {
	fn get_by_id(&self, id: &PeriodId) -> Result<Option<OperatingPeriod>, PeriodError>;
	fn get_monthly_periods(&self, month: String) -> Result<Vec<OperatingPeriod>, PeriodError>;
	fn post_process_periods(&self, periods: Vec<OperatingPeriod>) -> Result<(), PeriodError>;
}
