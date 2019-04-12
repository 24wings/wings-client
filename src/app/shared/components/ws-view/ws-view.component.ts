import {
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { environment, DataMode } from "src/environments/environment";
import { DxDataGridComponent, DxTreeListComponent } from "devextreme-angular";
import { View, TreeListView } from "../../dto/View";
import { DxiDataGridColumn } from "devextreme-angular/ui/nested/base/data-grid-column-dxi";
import DevExpress from "devextreme/bundles/dx.all";
import LocalStore from "devextreme/data/local_store";
import DataSource from "devextreme/data/data_source";
import { WsEditorComponent } from "../ws-editor/ws-editor.component";
@Component({ selector: "ws-view", templateUrl: "./ws-view.component.html" })
export class WsViewComponent {
  @ViewChild(WsEditorComponent) editor: WsEditorComponent;
  selectedRowKeys: string[] = [];
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;
  v: View & TreeListView;
  @Input() set view(v: View) {
    this.v = v as any;
    this.columns = v.cols;
  }
  @ViewChild(DxTreeListComponent) treeList: DxTreeListComponent;

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
    this.dataSource = new DataSource(
      this.v.dataSource);

  }
  onCreateSuccess() {
    if (this.v.viewType == 'table')
      this.dataGrid.instance.refresh();
    if (this.treeList) {
      this.treeList.instance.refresh()
    }
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
    if (this.dataGrid) {
      this.dataGrid.instance.deselectAll();

      this.dataGrid.instance.selectRows([$event.row.key], true);

    }
    if (this.treeList) {
      this.treeList.instance.deselectAll();
      this.treeList.instance.selectRows([$event.row.key], true);

    }

    this.editor.openUpdateModel($event.row.key);

  };

  add = $event => {
    if (this.dataGrid) {
      this.dataGrid.instance.deselectAll();
      this.dataGrid.instance.selectRows([$event.row.key], true);
    }
    if (this.treeList) {
      this.treeList.instance.deselectAll();
      this.treeList.instance.selectRows([$event.row.key], true);
    }
    this.editor.openNewModal($event.row.key);

  }
}
