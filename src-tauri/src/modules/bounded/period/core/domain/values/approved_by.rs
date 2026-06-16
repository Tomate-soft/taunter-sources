use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct ApprovedBy(pub String);

impl ApprovedBy {
    pub fn new(approved_by: String) -> Self {
        // Validación opcional
        Self(approved_by)
    }
    pub fn value(&self) -> &str {
        &self.0
    }
}