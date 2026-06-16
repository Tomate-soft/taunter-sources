use crate::modules::bounded::period::core::domain::{
	entities::operating_period::OperatingPeriod,
	errors::PeriodError,
	ports::PeriodInboundPort,
};

pub(super) struct FailingInboundStub;

impl PeriodInboundPort for FailingInboundStub {
	fn get_period_by_id(&self, _id: String) -> Result<OperatingPeriod, PeriodError> {
		Err(PeriodError::InvalidId)
	}

	fn get_monthly_periods(&self, _month: String) -> Result<Vec<OperatingPeriod>, PeriodError> {
		Err(PeriodError::InvalidMonth)
	}

	// fn post_process_periods(&self, _periods: Vec<OperatingPeriod>) -> Result<(), PeriodError> {
	// 	Err("Failed to post-process periods".into())
	// }
}
