import { Component } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { environment } from "../../../../../environments/environment";

class ServerView {
  dataSource: {
    type: string;
    loadUrl: string;
    insertUrl: string;
    updateUrl: string;
    deleteUrl: string;
  };
}

@Component({ selector: "page", templateUrl: "./page.component.html" })
export class PageComponent {
  selectedDVO;
  constructor(private route: ActivatedRoute, private client: HttpClient) {}
  dvos: any[] = [];
  async ngOnInit() {
    var dvo = this.route.snapshot.queryParams.dvo;
    this.dvos = (await this.client
      .get(environment.ip + "/api/Hk/DVO/listDVO")
      .toPromise()) as any;
    let res = this.client
      .get(environment.ip + "/api/Hk/Auth/login")
      .toPromise();
    console.log(res);
  }
  selectView(dvo: ServerView) {
    if (dvo.dataSource.type == "odata") {
      console.log(environment.ip + dvo.dataSource.deleteUrl);
      dvo.dataSource = AspNetData.createStore({
        key: "orgId",
        loadUrl: environment.ip + dvo.dataSource.loadUrl,
        insertUrl: environment.ip + dvo.dataSource.insertUrl,
        updateUrl: environment.ip + dvo.dataSource.updateUrl,
        deleteUrl: environment.ip + dvo.dataSource.deleteUrl
      }) as any;
    }

    this.selectedDVO = dvo;
  }
}
