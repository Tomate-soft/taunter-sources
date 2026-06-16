use super::PeriodApplicationService;
use super::period_application_service_test_utils::FailingInboundStub;
use crate::modules::bounded::period::core::{
	application::{errors::PeriodApplicationError, interfaces::PeriodApplicationServiceInterface},
};

#[test]
fn get_period_by_id_maps_domain_error_to_application_error() {
	let service = PeriodApplicationService::new(FailingInboundStub);

	let result = PeriodApplicationServiceInterface::get_period_by_id(&service, "".to_string());

	assert!(matches!(result, Err(PeriodApplicationError::InvalidInput)));
}
