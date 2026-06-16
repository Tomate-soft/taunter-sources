use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Serialize, Deserialize)]
pub struct PeriodStatus(pub bool);

impl PeriodStatus {
    pub fn new(status: bool) -> Self {
        Self(status)
    }
    pub fn value(&self) -> bool {
        self.0
    }
}