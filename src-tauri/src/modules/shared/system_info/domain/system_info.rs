use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SystemInfo {
    pub os_name: String,
    pub os_version: String,
    pub architecture: String,
    pub app_version: String,
}

impl SystemInfo {
    pub fn new(os_name: String, os_version: String, architecture: String, app_version: String) -> Self {
        Self {
            os_name,
            os_version,
            architecture,
            app_version,
        }
    }
}
