import { Component, ViewChild } from '@angular/core';
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { environment } from "src/environments/environment";
import { DxDataGridComponent } from "devextreme-angular";
import { confirm } from "devextreme/ui/dialog";
import notify from "devextreme/ui/notify";
import { HttpClient } from '@angular/common/http';
@Component({
    selector: "verify-project-manage-apply-page",
    templateUrl: "./verify-project-manage-apply-page.component.html"
})
export class VerifyProjectManageApplyPageComponent {
    StateOptions = [{ label: "待审核", value: 0 }, { label: "审核成功", value: 1 }, { label: "审核失败", value: 2 }];
    @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
    projectManageApplyUrl = environment.ip + "/api/CucrSaas/ZC/Admin/ProjectManageApply";
    dataSource = AspNetData.createStore({
        key: "id",
        loadUrl: this.projectManageApplyUrl,
        updateUrl: this.projectManageApplyUrl,
        deleteUrl: this.projectManageApplyUrl,
        insertUrl: this.projectManageApplyUrl
    })
    constructor(private httpClient: HttpClient) {
        console.log(this.projectManageApplyUrl)
    }
    pass = async ($event: { row: { data: any } }) => {
        var sure = await confirm("确认审核通过?", "审核资质");
        if (sure) {
            if ($event.row.data.status == 0)
                // await this.dataSource.update($event.row.data.id, { status: 1 });
                await this.httpClient.get(this.projectManageApplyUrl + "/projectManageApplyVerifyPass", { params: { projectManageApplyId: $event.row.data.id } }).toPromise();
            else {
                notify("已经审核过的用户无法再次审核");
            }
        } else {
            // await this.dataSource.update($event.row.data.id, { status: 2 });
        }
        this.dataGrid.instance.refresh();
        console.log($event);
    }
    reject = async ($event: { row: { data: any } }) => {
        var sure = await confirm("确认审核失败?", "审核资质");
        if (sure) {
            if ($event.row.data.status == 0)
                await this.dataSource.update($event.row.data.id, { status: 2 });
            else {
                notify("已经审核过的用户无法再次审核");
            }
        } else {

            // await this.dataSource.update($event.row.data.id, { status: 2 });
        }
        this.dataGrid.instance.refresh();
        console.log($event);
    }
}
