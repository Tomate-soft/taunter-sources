use crate::modules::bounded::period::core::{
	application::{
		errors::PeriodApplicationError,
		interfaces::PeriodApplicationServiceInterface,
	},
	domain::{
		entities::operating_period::OperatingPeriod,
		ports::PeriodInboundPort,
	},
};

pub struct PeriodApplicationService<S: PeriodInboundPort> {
	service: S,
}

impl<S: PeriodInboundPort> PeriodApplicationService<S> {
	pub fn new(service: S) -> Self {
		Self { service }
	}
}

impl<S: PeriodInboundPort> PeriodApplicationServiceInterface for PeriodApplicationService<S> {
	fn get_period_by_id(&self, id: String) -> Result<OperatingPeriod, PeriodApplicationError> {
		self.service.get_period_by_id(id).map_err(Into::into)
	}


	fn get_monthly_periods(&self, month: String) -> Result<Vec<OperatingPeriod>, PeriodApplicationError> {
		self.service.get_monthly_periods(month).map_err(Into::into)
	}

	fn post_process_periods(&self, periods: Vec<OperatingPeriod>) -> Result<(), PeriodApplicationError> {
		self.service.post_process_periods(periods).map_err(Into::into)
	}
}
