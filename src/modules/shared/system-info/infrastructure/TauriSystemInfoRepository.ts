import { invoke } from '@tauri-apps/api/core';
import { SystemInfo, SystemInfoRepository } from '../domain/SystemInfo';
import { SystemInfoCommand } from './constants/commands';

export class TauriSystemInfoRepository implements SystemInfoRepository {
  async getSystemInfo(): Promise<SystemInfo> {
    return invoke<SystemInfo>(SystemInfoCommand.get);
  }
}
