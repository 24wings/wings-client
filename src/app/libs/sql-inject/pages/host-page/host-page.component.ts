import { Component } from "@angular/core";
import Dexie from "dexie";
import CustomStore from "devextreme/data/custom_store";
import { HostService } from "src/app/shared/services/host.service";
import { DbService } from "src/app/shared/services/db.service";

class Host {
  veid: string;
  apiKey: string;
  remark?: string;
  vm_type: string;
  suspended: boolean;
  ip_addresses: string[];
  os: string;
}

@Component({
  selector: "host-page",
  templateUrl: "./host-page.component.html"
})
export class HostPageComponent {
  dataSource = new CustomStore({
    load: (loadOptions: any) => {
      var params = "?";

      params += "skip=" + loadOptions.skip;
      params += "&take=" + loadOptions.take;

      if (loadOptions.sort) {
        params += "&orderby=" + loadOptions.sort[0].selector;
        if (loadOptions.sort[0].desc) {
          params += " desc";
        }
      }
      return this.hostService.listHostFromDb();
    },
    insert: data => {
      return this.dbService.db.host.put(data);
    },
    update: (key, data) => {
      return this.dbService.db.host.update(key, data);
    }
  });
  hosts: any[] = [];
  async ngOnInit() {}
  constructor(private hostService: HostService, private dbService: DbService) {}
  async rowPrepare(row: { key: Host }) {
    debugger;
    if (typeof row.key == "object") {
      var vm = await this.hostService.getHostInfo(row.key.veid, row.key.apiKey);
      row.key.vm_type = vm.vm_type;
      row.key.suspended = vm.suspended;
      row.key.ip_addresses = vm.ip_addresses;
      row.key.os = vm.os;
    }
  }
}
