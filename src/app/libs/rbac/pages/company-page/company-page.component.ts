import { Component } from '@angular/core';
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { environment } from 'src/environments/environment';
import { DxDataGridComponent } from 'devextreme-angular';
@Component({
    selector: "company-page",
    templateUrl: "./company-page.component.html"
})
export class CompanyPageComponent {
    companyUrl = environment.ip + "/api/CucrSaas/ZC/Admin/Company"
    popupVisible = false;


    dataSource = AspNetData.createStore({
        key: "id",
        loadUrl: this.companyUrl,
        insertUrl: this.companyUrl,
        updateUrl: this.companyUrl,
        deleteUrl: this.companyUrl,
    });

}