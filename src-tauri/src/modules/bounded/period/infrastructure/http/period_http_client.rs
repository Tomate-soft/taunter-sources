use reqwest::StatusCode;

use crate::modules::bounded::period::core::domain::{
	dtos::{ OperatingPeriodDto, PeriodsResponseDto, ProcessPeriodsRequestDto, TaunterPeriodDto },
	errors::PeriodError,
};

pub trait PeriodHttpClient: Send + Sync {
	fn get_period_by_id(&self, id: &str) -> Result<OperatingPeriodDto, PeriodError>;
	fn get_monthly_periods(&self, month: String) -> Result<Vec<OperatingPeriodDto>, PeriodError>;
	fn post_process_periods(&self, periods: Vec<TaunterPeriodDto>) -> Result<(), PeriodError>;
}

pub struct ReqwestPeriodHttpClient {
	base_url: String,
	client: reqwest::blocking::Client,
}

impl ReqwestPeriodHttpClient {
	pub fn new(base_url: impl Into<String>) -> Self {
		Self {
			base_url: base_url.into(),
			client: reqwest::blocking::Client::new(),
		}
	}

	fn periods_url(&self) -> String {
		format!("{}/period-stats/by-month?month=2026-04", self.base_url.trim_end_matches('/'))
	}
}

impl PeriodHttpClient for ReqwestPeriodHttpClient {
	fn get_period_by_id(&self, id: &str) -> Result<OperatingPeriodDto, PeriodError> {
		let url = format!("{}/{}", self.periods_url(), id);
		println!("[period_http_client] GET {}", url);
		let response = self.client.get(url).send().map_err(|_| PeriodError::Unknown)?;
		println!("[period_http_client] status={} (get_by_id)", response.status());

		if response.status() == StatusCode::NOT_FOUND {
			return Err(PeriodError::NotFound);
		}

		if !response.status().is_success() {
			return Err(PeriodError::Unknown);
		}

		response.json::<OperatingPeriodDto>().map_err(|_| PeriodError::Unknown)
	}

	fn get_monthly_periods(&self, month: String) -> Result<Vec<OperatingPeriodDto>, PeriodError> {
		let url = format!("{}/period-stats/by-month?month={}", self.base_url.trim_end_matches('/'), month);
		println!("[period_http_client] GET {}", url);
		let response = self.client.get(url).send().map_err(|_| PeriodError::Unknown)?;
		println!("[period_http_client] status={}", response.status());
		if !response.status().is_success() {
			return Err(PeriodError::Unknown);
		}
		let response_dto = response.json::<PeriodsResponseDto>().map_err(|_| PeriodError::Unknown)?;
		println!("[period_http_client] result={:?}", response_dto.data);
		for item in &response_dto.data {
			println!("[period_http_client] id={} status={}", item.id, item.status);
		}
		Ok(response_dto.data)
	}

	fn post_process_periods(&self, periods: Vec<TaunterPeriodDto>) -> Result<(), PeriodError> {
		let url = format!("{}/write-taunter/process", self.base_url.trim_end_matches('/'));
		let body = ProcessPeriodsRequestDto { reports: periods };

		let body_json = serde_json::to_string_pretty(&body).unwrap_or_else(|e| format!("<serialize error: {}>", e));
		println!("[period_http_client] POST {}", url);
		println!("[period_http_client] request body:\n{}", body_json);

		let response = match self.client.post(&url).json(&body).send() {
			Ok(resp) => resp,
			Err(e) => {
				println!("[period_http_client] request failed: {}", e);
				return Err(PeriodError::Unknown);
			}
		};

		let status = response.status();
		println!("[period_http_client] response status={}", status);

		let response_text = response.text().unwrap_or_else(|e| format!("<read error: {}>", e));
		println!("[period_http_client] response body:\n{}", response_text);

		if !status.is_success() {
			println!("[period_http_client] ERROR: backend returned {}", status);
			return Err(PeriodError::Unknown);
		}

		Ok(())
	}
}
