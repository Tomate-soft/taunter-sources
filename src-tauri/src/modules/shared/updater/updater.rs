use tauri::AppHandle;
use tauri_plugin_updater::UpdaterExt;
use tauri_plugin_notification::NotificationExt;

pub async fn check_and_install_update(app: AppHandle) -> tauri_plugin_updater::Result<()> {
    if let Some(update) = app.updater()?.check().await? {
        app.notification()
            .builder()
            .title("Actualización disponible")
            .body("Se está descargando una nueva versión...")
            .show()
            .ok();

        let mut downloaded = 0;
        update.download_and_install(
            |chunk_length, content_length| {
                downloaded += chunk_length;
                println!("Descargado {downloaded} de {content_length:?}");
            },
            || {
                println!("Descarga finalizada");
            },
        ).await?;

        app.notification()
            .builder()
            .title("Actualización instalada")
            .body("La aplicación se reiniciará para completar la actualización.")
            .show()
            .ok();

        app.restart();
    }
    Ok(())
}