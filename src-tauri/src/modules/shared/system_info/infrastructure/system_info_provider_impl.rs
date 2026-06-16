use std::env;
use crate::modules::shared::system_info::domain::{
    system_info::SystemInfo,
    ports::SystemInfoProvider
};

pub struct DefaultSystemInfoProvider {
    app_version: String,
}

impl DefaultSystemInfoProvider {
    pub fn new(app_version: String) -> Self {
        Self { app_version }
    }
}

impl SystemInfoProvider for DefaultSystemInfoProvider {
    fn get_system_info(&self) -> Result<SystemInfo, String> {
        let os_name = env::consts::OS.to_string();
        let architecture = env::consts::ARCH.to_string();
        
        let os_version = "Moises el crack".to_string(); // Obtener la versión del sistema operativo es complicado y varía según la plataforma. Por simplicidad, lo dejamos como "Unknown". pero despues veremos de cual es l amejor manera de obtenerlo o si hay que usar algun crate externo para eso.

        Ok(SystemInfo::new(
            os_name,
            os_version,
            architecture,
            self.app_version.clone(),
        ))
    }
}
