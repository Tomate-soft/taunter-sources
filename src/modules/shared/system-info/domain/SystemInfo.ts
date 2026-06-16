export interface SystemInfo {
  os_name: string;
  os_version: string;
  architecture: string;
  app_version: string;
}

export interface SystemInfoRepository {
  getSystemInfo(): Promise<SystemInfo>;
}
