use std::fmt;

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum PeriodError {
	InvalidId,
	NotFound,
	Unknown,
	InvalidMonth,
}

impl fmt::Display for PeriodError {
	fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
		match self {
			Self::InvalidId => write!(f, "Invalid Period ID"),
			Self::NotFound => write!(f, "Period not found"),
			Self::Unknown => write!(f, "Unknown period error"),
			Self::InvalidMonth => write!(f, "Invalid month format"),
		}
	}
}

impl std::error::Error for PeriodError {}
