use crate::modules::shared::{
    tray::tray::create_tray,
};
use tauri::App;

pub fn bootstrap(app: &mut App) -> tauri::Result<()> {
    create_tray(app)?;
    
    // let handle = app.handle().clone();
    // tauri::async_runtime::spawn(async move {
    //     let _ = check_and_install_update(handle).await;
    // });

    Ok(())
}