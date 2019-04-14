import {
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { environment, DataMode } from "src/environments/environment";
import {
  DxDataGridComponent,
  DxTreeListComponent,
  DxTreeViewComponent
} from "devextreme-angular";
import { View, TreeListView } from "../../dto/View";
import { DxiDataGridColumn } from "devextreme-angular/ui/nested/base/data-grid-column-dxi";
import DevExpress from "devextreme/bundles/dx.all";
import LocalStore from "devextreme/data/local_store";
import DataSource from "devextreme/data/data_source";
import { WsEditorComponent } from "../ws-editor/ws-editor.component";
import { confirm } from "devextreme/ui/dialog";
@Component({ selector: "ws-view", templateUrl: "./ws-view.component.html" })
export class WsViewComponent {
  recursiveSelectionEnabled = true;
  _formData_ = {};
  template: string = `
  <h1>Good Morning, {{title}}</h1>
`;
  @ViewChild(DxTreeViewComponent) treeView: DxTreeViewComponent;
  item;
  bindings: any = { title: "Chuck Norris" };
  mode: "List" | "Create" | "Update" | "Info" = "List";
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
    | any[]
    | DevExpress.data.DataSource
    | DevExpress.data.DataSourceOptions = [];

  dataItems: any[] = [{ id: 1, name: "123" }];

  ngOnInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.dataSource = this.v.dataSource;
    if (this.v.querys) {
      this.item = this.v.querys[0];
    }
  }
  onCreateSuccess() {
    if (this.v.viewType == "table") {
      this.dataGrid.instance.refresh();
    }
    if (this.treeList) {
      setTimeout(() => {
        this.treeList.instance.refresh();
      }, 200);
    }
    // this.mode = "List";
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

  edit = async $event => {
    if (this.dataGrid) {
      this.dataGrid.instance.deselectAll();

      this.dataGrid.instance.selectRows([$event.row.key], true);
      var items = await this.dataGrid.instance.getSelectedRowsData();
      console.log($event, items);
      this.editor.setSelectedRows(items);
    }
    if (this.treeList) {
      this.treeList.instance.deselectAll();
      this.treeList.instance.selectRows([$event.row.key], true);
      var items2 = await this.treeList.instance.getSelectedRowsData();
      this.editor.setSelectedRows(items2);
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
  };
  openNewModal() {
    this.editor.openNewModal();
  }
  async deleteSelected() {
    var sure = await confirm("你确定要删除这些记录?", "提示");
    if (sure) {
      this.dataGrid.instance.getSelectedRowKeys().forEach(keu => {
        var key = (this.dataSource as DevExpress.data.DataSource).key();
        (this.dataSource as DevExpress.data.DataSource).store().remove(key);
      });
    }
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    if (this.v.viewType == "table") this.dataGrid.instance.filter([]);
    if (this.v.viewType == "tree-list") {
      this.treeList.instance.filter([
        "parentId",
        "=",
        "bd898b72-7589-b81c-d734-c691697e6b6a"
      ]);
    }
  }

  addPresetFilter($event) {
    console.log($event);
  }
  treeView_itemSelectionChanged(e) {
    // alert(1);
    const nodes = e.component.getNodes();
    debugger;
    // this.formData[item.dataField] = this.getSelectedRows()
    console.log(e, this._formData_);
    // this.treeView.
    // this.treeBoxValue = this.getSelectedItemsKeys(nodes).join(",");
    this._formData_[this.item.dataField] = this.getSelectedItems(nodes).map(
      n => n.itemData
    );
    debugger;

    return false;
  }

  getSelectedItemsKeys(items) {
    console.log(items);
    var result = [],
      that = this;

    items.forEach(function(item) {
      if (item.selected) {
        result.push(item.key);
      }
      if (item.items.length) {
        result = result.concat(that.getSelectedItemsKeys(item.items));
      }
    });
    return result;
  }
  getSelectedItems(items) {
    console.log(items);
    var result = [],
      that = this;

    items.forEach(function(item) {
      if (item.selected) {
        result.push(item);
      }
      if (item.items.length) {
        result = result.concat(that.getSelectedItems(item.items));
      }
    });
    return result;
  }
  syncTreeViewSelection($event) {
    if (!this.treeView) return;
    debugger;
    this.treeView.instance.selectItem($event.itemData);
  }
}
