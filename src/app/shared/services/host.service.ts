import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DbService } from "./db.service";

export class VM {
  vm_type: string;
  suspended: boolean;
  ip_addresses: string[];
  os: string;
}

@Injectable()
export class HostService {
  private getHostInfoUrl(veid: string, apiKey) {
    return `https://api.64clouds.com/v1/getServiceInfo?veid=${veid}&api_key=${apiKey}`;
  }
  constructor(private httpClient: HttpClient, private dbService: DbService) {}
  getHostInfo(veid: string, apiKey: string): Promise<VM> {
    return this.httpClient
      .get(this.getHostInfoUrl(veid, apiKey))
      .toPromise() as any;
  }
  listHostFromDb() {
    return this.dbService.db.host.toArray();
  }
}
