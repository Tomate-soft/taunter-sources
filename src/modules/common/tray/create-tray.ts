import { TrayIcon } from '@tauri-apps/api/tray';
import { Menu } from '@tauri-apps/api/menu';
import { defaultWindowIcon } from '@tauri-apps/api/app'; // 👈 agregar

export async function createTray() {

    function onMenuClick(itemId: string) {
  if (itemId === 'quit') { }
  if (itemId === 'settings') { }
}

const menu = await Menu.new({
  items: [
    { id: 'quit', text: 'Salir', action: onMenuClick },
    { id: 'settings', text: 'Configuración', action: onMenuClick },
  ],
});

const tray = await TrayIcon.new({
  icon: await defaultWindowIcon() ?? undefined, 
  menu,
  menuOnLeftClick: true,
  action: (event) => {
    switch (event.type) {
      case 'Click':
        console.log(`Botón: ${event.button}, Estado: ${event.buttonState}`);
        break;
      case 'DoubleClick':
        console.log(`Doble clic con botón: ${event.button}`);
        break;
      case 'Enter':
        console.log(`Mouse entró en ${event.rect.position.x}, ${event.rect.position.y}`);
        break;
      case 'Leave':
        console.log('Mouse salió del ícono');
        break;
    }
  },
});

return tray;
}