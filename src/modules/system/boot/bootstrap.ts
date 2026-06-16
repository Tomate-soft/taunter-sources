import { GetSystemInfoUseCase } from "../../shared/system-info/application/GetSystemInfoUseCase";
import { TauriSystemInfoRepository } from "../../shared/system-info/infrastructure/TauriSystemInfoRepository";
import { SystemInfo } from "../../shared/system-info/domain/SystemInfo";
import { printingServiceContainer } from "../../shared/printing/infrastructure/printingServiceContainer";

interface Bootstrap {
  getInfoContainer: {
    getInfo: () => Promise<SystemInfo>;
  };
  printingContainer: typeof printingServiceContainer;
}

// Inicialización de dependencias 
const repository = new TauriSystemInfoRepository();
const getSystemInfoUseCase = new GetSystemInfoUseCase(repository);

const systemInfoServiceContainer = {
  getInfo: () => getSystemInfoUseCase.execute(),
};

export default function bootstrap(): Bootstrap {

  // useEffect(() => {
  //   createTray();
  // }, []);
  
  return { 
    getInfoContainer: systemInfoServiceContainer,
    printingContainer: printingServiceContainer,
  };
}