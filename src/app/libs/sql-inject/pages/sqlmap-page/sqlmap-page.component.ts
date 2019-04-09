import { Component, ViewChild } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import CustomStore from "devextreme/data/custom_store";
import {
  SqlMapService,
  SqlmapOption
} from "src/app/shared/services/sqlmap.service";
import { DbService } from "src/app/shared/services/db.service";
import { DxDataGridComponent } from "devextreme-angular";

class SqlmapTask {
  taskId: string;
  status: string;
  url: string;
}

@Component({
  selector: "sqlmap-page",
  templateUrl: "./sqlmap-page.component.html"
})
export class SqlmapPageComponent {
  tipVisible: boolean = false;

  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  dataSource = new CustomStore({
    key: "taskId",
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
      return this.listTask();
    },
    remove: key => {
      return this.sqlmapService.deleteTask(this.ip, key);
    },
    update: async (key, value) => {
      await this.sqlmapService.setTaskOption(this.ip, key, value);
      await this.listTask();
    }
  });
  private ip: string = "http://localhost:8775";
  tasks: { taskId: string }[] = [];
  async deleteSelectionTasks() {
    var keys = this.dataGrid.instance.getSelectedRowKeys();
    for (var key of keys)
      await this.sqlmapService.deleteTask(this.ip, key.taskId);
    this.listTask();
  }

  constructor(
    private httpClient: HttpClient,
    private sqlmapService: SqlMapService,
    private dbServie: DbService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  async listTask() {
    var data = await this.sqlmapService.getTaskList(this.ip);
    return Object.keys(data.tasks).map(taskId => {
      return { taskId, status: data.tasks[taskId] };
    });
  }
  async onTaskPrepare($event: { data: SqlmapTask; key: string }) {
    if (typeof $event.data == "object") {
      var sqlmapOption = await this.sqlmapService.getTaskOption(
        this.ip,
        $event.key
      );
      $event.data.url = sqlmapOption.options.url;
    }
  }
  copy() {}
  taskStart = async $event => {
    await this.sqlmapService.taskStart(this.ip, $event.row.data.taskId);
  };

  viewLog = async $event => {
    return this.sqlmapService.taskLog(this.ip, $event.row.data.taskId);
  };
}
