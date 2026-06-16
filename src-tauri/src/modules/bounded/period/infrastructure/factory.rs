use crate::modules::bounded::period::{
	core::{application::PeriodApplicationService, domain::services::PeriodService},
	infrastructure::{adapters::PeriodRepositoryHttpAdapter, http::ReqwestPeriodHttpClient},
};

pub type DefaultPeriodApplicationService =
	PeriodApplicationService<PeriodService<PeriodRepositoryHttpAdapter<ReqwestPeriodHttpClient>>>;

pub fn build_period_application_service(base_url: impl Into<String>) -> DefaultPeriodApplicationService {
	let http_client = ReqwestPeriodHttpClient::new(base_url);
	let repository = PeriodRepositoryHttpAdapter::new(http_client);
	let domain_service = PeriodService::new(repository);
	PeriodApplicationService::new(domain_service)
}
