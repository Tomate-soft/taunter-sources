use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct PeriodTimestamp(pub String);

impl PeriodTimestamp {
    pub fn new(ts: String) -> Self {
        // Aquí puedes agregar validación de formato de fecha
        Self(ts)
    }
    pub fn value(&self) -> &str {
        &self.0
    }
}