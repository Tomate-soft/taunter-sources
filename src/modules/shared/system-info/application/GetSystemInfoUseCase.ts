import { SystemInfo, SystemInfoRepository } from '../domain/SystemInfo';

export class GetSystemInfoUseCase {
  constructor(private readonly repository: SystemInfoRepository) {}

  async execute(): Promise<SystemInfo> {
    return this.repository.getSystemInfo();
  }
}
