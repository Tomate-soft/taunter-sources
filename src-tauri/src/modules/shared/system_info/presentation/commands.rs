use crate::modules::shared::system_info::{
    application::get_system_info::GetSystemInfoUseCase,
    domain::system_info::SystemInfo,
    infrastructure::system_info_provider_impl::DefaultSystemInfoProvider,
};

pub fn get_system_info_command<R: tauri::Runtime>(app_handle: tauri::AppHandle<R>) -> Result<SystemInfo, String> {
    let app_version = app_handle.package_info().version.to_string();
    
    let provider = DefaultSystemInfoProvider::new(app_version);
    let use_case = GetSystemInfoUseCase::new(provider);

    use_case.execute()
}
