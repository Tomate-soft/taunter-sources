use crate::features::shared::tray::tray::create_tray;
use tauri::App;

pub fn bootstrap(app: &mut App) -> tauri::Result<()> {
    create_tray(app)?;
    Ok(())
}
