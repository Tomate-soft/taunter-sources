use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct PeriodId(pub String);

impl PeriodId {
    pub fn new(id: String) -> Self {
        // Aquí puedes agregar validaciones si es necesario
        Self(id)
    }
    pub fn value(&self) -> &str {
        &self.0
    }
}