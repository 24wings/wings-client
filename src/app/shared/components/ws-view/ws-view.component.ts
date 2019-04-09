import {
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { environment, DataMode } from "src/environments/environment";
import { DxDataGridComponent } from "devextreme-angular";
import { View } from "../../dto/View";
import { DxiDataGridColumn } from "devextreme-angular/ui/nested/base/data-grid-column-dxi";
import DevExpress from "devextreme/bundles/dx.all";
import LocalStore from "devextreme/data/local_store";
import { WsEditorComponent } from "../ws-editor/ws-editor.component";
@Component({ selector: "ws-view", templateUrl: "./ws-view.component.html" })
export class WsViewComponent {
  @ViewChild(WsEditorComponent) editor: WsEditorComponent;
  selectedRowKeys: string[] = [];
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  v: View;
  @Input() set view(v: View) {
    this.v = v;
    this.columns = v.cols;
  }

  @Output() onAction = new EventEmitter();
  columns: DxiDataGridColumn[] = [];
  dataSource:
    | string
    | any[]
    | DevExpress.data.DataSource
    | DevExpress.data.DataSourceOptions = [];

  dataItems: any[] = [{ id: 1, name: "123" }];

  ngOnInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

    if (environment.dataMode == DataMode.LocalStorage) {
      this.dataSource = {
        store: new LocalStore({
          key: this.v.key,
          name: "myLocalData",
          immediate: true,
          flushInterval: 1000
          // Other LocalStore options go here
        })
      };
    } else {
      this.dataSource = AspNetData.createStore({
        key: "id",
        loadUrl: environment.dvoUrl,
        insertUrl: environment.dvoUrl,
        updateUrl: environment.dvoUrl,
        deleteUrl: environment.dvoUrl,
        onBeforeSend: function(method, ajaxOptions) {
          ajaxOptions.xhrFields = { withCredentials: true };
        }
      }) as any;
    }
  }
  onCreateSuccess() {
    this.dataGrid.instance.refresh();
  }

  setSelectRowKeys($event) {
    this.editor.setSelectedRows(this.dataGrid.instance.getSelectedRowsData());
  }
  doAction = $event => {
    var btn = $event.column.buttons[0];
    var eventName = btn.name;

    this.onAction.emit({
      eventName,
      data: $event.row.data,
      $event,
      action: this.selectedAction
    });
  };

  selectedAction;
  selectAction() {
    this.selectedAction = "eas";
    alert(1);
  }

  edit = $event => {
    this.dataGrid.instance.deselectAll();
    console.log($event.row.key);
    this.dataGrid.instance.selectRows([$event.row.key], true);
    this.editor.openUpdateModel();
  };
}
