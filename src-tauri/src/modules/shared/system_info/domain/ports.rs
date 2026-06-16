use super::system_info::SystemInfo;

pub trait SystemInfoProvider: Send + Sync {
    fn get_system_info(&self) -> Result<SystemInfo, String>;
}
