import { useEffect } from "react";
import { createTray } from "../../common/tray/create-tray";

export default function bootstrap() {
  useEffect(() => {
    createTray();
  }, []);
}