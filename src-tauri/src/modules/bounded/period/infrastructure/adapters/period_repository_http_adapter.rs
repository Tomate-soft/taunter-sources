use crate::modules::bounded::period::{
	core::domain::{
		entities::operating_period::OperatingPeriod,
		errors::PeriodError,
		ports::PeriodRepository,
		values::PeriodId,
	},
	infrastructure::http::PeriodHttpClient,
};

pub struct PeriodRepositoryHttpAdapter<C: PeriodHttpClient> {
	http_client: C,
}

impl<C: PeriodHttpClient> PeriodRepositoryHttpAdapter<C> {
	pub fn new(http_client: C) -> Self {
		Self { http_client }
	}
}

impl<C: PeriodHttpClient> PeriodRepository for PeriodRepositoryHttpAdapter<C> {
	fn get_by_id(&self, id: &PeriodId) -> Result<Option<OperatingPeriod>, PeriodError> {
		match self.http_client.get_period_by_id(id.value()) {
			Ok(dto) => Ok(Some(dto.into())),
			Err(PeriodError::NotFound) => Ok(None),
			Err(error) => Err(error),
		}
	}

	fn get_monthly_periods(&self, month: String) -> Result<Vec<OperatingPeriod>, PeriodError> {
		let dtos = self.http_client.get_monthly_periods(month)?;
		Ok(dtos.into_iter().map(Into::into).collect())
	}

	fn post_process_periods(&self, periods: Vec<OperatingPeriod>) -> Result<(), PeriodError> {
		let dtos: Vec<_> = periods.into_iter().map(Into::into).collect();
		self.http_client.post_process_periods(dtos)
	}
}
