pub mod modules;
pub mod system;
use system::boot::bootstrap::bootstrap;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    dotenv::dotenv().ok();
    modules::register_features(tauri::Builder::default())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_notification::init())
        .setup(|app| {
            bootstrap(app)?;
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}