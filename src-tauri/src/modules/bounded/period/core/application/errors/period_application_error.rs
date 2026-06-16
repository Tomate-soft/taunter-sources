use std::fmt;

use crate::modules::bounded::period::core::domain::errors::PeriodError;

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum PeriodApplicationError {
	InvalidInput,
	NotFound,
	Domain,
	Unknown,
}

impl From<PeriodError> for PeriodApplicationError {
	fn from(error: PeriodError) -> Self {
		match error {
			PeriodError::InvalidId => Self::InvalidInput,
			PeriodError::NotFound => Self::NotFound,
			PeriodError::Unknown => Self::Unknown,
			PeriodError::InvalidMonth => Self::InvalidInput,
		}
	}
}

impl fmt::Display for PeriodApplicationError {
	fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
		match self {
			Self::InvalidInput => write!(f, "Invalid period input"),
			Self::NotFound => write!(f, "Period not found"),
			Self::Domain => write!(f, "Domain error in period flow"),
			Self::Unknown => write!(f, "Unknown application error"),
		}
	}
}

impl std::error::Error for PeriodApplicationError {}
