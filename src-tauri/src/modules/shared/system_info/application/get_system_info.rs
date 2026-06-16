use crate::modules::shared::system_info::domain::{
        ports::SystemInfoProvider,
        system_info::SystemInfo 
};

pub struct GetSystemInfoUseCase<P: SystemInfoProvider> {
    provider: P,
}

impl<P: SystemInfoProvider> GetSystemInfoUseCase<P> {
    pub fn new(provider: P) -> Self {
        Self { provider }
    }

    pub fn execute(&self) -> Result<SystemInfo, String> {
        self.provider.get_system_info()
    }
}
