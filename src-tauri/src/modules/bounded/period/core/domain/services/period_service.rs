use crate::modules::bounded::period::core::domain::{
	entities::operating_period::OperatingPeriod,
	errors::PeriodError,
	ports::{PeriodInboundPort, PeriodRepository},
	values::PeriodId,
};

pub struct PeriodService<R: PeriodRepository> {
	repository: R,
}

impl<R: PeriodRepository> PeriodService<R> {
	pub fn new(repository: R) -> Self {
		Self { repository }
	}

	fn validate_id(id: &str) -> Result<(), PeriodError> {
		if id.trim().is_empty() {
			return Err(PeriodError::InvalidId);
		}

		Ok(())
	}
}

impl<R: PeriodRepository> PeriodInboundPort for PeriodService<R> {
	fn get_period_by_id(&self, id: String) -> Result<OperatingPeriod, PeriodError> {
		Self::validate_id(&id)?;

		let period_id = PeriodId::new(id);
		let period = self.repository.get_by_id(&period_id)?;

		period.ok_or(PeriodError::NotFound)
	}

	fn get_monthly_periods(&self, month: String) -> Result<Vec<OperatingPeriod>, PeriodError> {
		self.repository.get_monthly_periods(month)
	}

	fn post_process_periods(&self, periods: Vec<OperatingPeriod>) -> Result<(), PeriodError> {
		self.repository.post_process_periods(periods)
	}
}
