import {
  Component,
  Input,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { View, TreeListView } from "../../dto/View";
import { DxFormComponent } from "devextreme-angular";
import DevExpress from "devextreme/bundles/dx.all";
import { Cell } from "../../dto/Cell";
import LocalStore from "devextreme/data/local_store";
import notify from "devextreme/ui/notify";
import { confirm } from "devextreme/ui/dialog";
import DataSource from "devextreme/data/data_source";

@Component({ selector: "ws-editor", templateUrl: "ws-editor.component.html" })
export class WsEditorComponent {
  @ViewChild(DxFormComponent) dxForm: DxFormComponent;
  editorVisible = false;
  dataSource: DataSource;




  formData = {};
  v: View;
  items: Cell[] = [];
  @Input() set view(v: View) {
    this.v = v;
    // if (v) this.dxForm.items = v.items;
    if (v) {
      this.items = v.items;
    }
  }
  submitButtonOptions = {
    text: "提交",
    type: "success",
    useSubmitBehavior: true
  };
  @Output() onCreateSuccess = new EventEmitter();
  customer = {};
  async onFormSubmit() {
    console.log(this.dataSource);
    debugger;
    if (this.mode == "create") {
      await this.dataSource.store().insert(this.formData)
      this.dataSource.store().load();
      this.onCreateSuccess.emit();
      this.editorVisible = false;
      notify("数据提交成功", "success");
    } else {
      this.update();
    }
  }

  openNewModal(parentId = null) {
    var parentIdExpr = (this.v as TreeListView).parentIdExpr
    if (parentId && this.v.viewType == 'tree-list' && parentIdExpr) {
      this.formData[parentIdExpr] = parentId;
    }
    this.editorVisible = true;
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.dataSource = new DataSource(this.v.dataSource);
  }
  selectedRows = [];
  setSelectedRows($event) {
    this.selectedRows = $event;
  }
  async deleteSelected() {
    var sure = await confirm("你确定要删除这些记录?", "提示");
    if (sure) {
      this.selectedRows.forEach(row => {
        var key = this.dataSource.store().key;
        this.dataSource.store().remove(row[key]);
      });
    }
    this.onCreateSuccess.emit();
  }
  log(data) {
    console.log(data);
  }
  mode: "create" | "update" | "info" = "create";
  openUpdateModel(parentId) {
    this.mode = "update";
    this.formData = this.selectedRows[0];
    this.editorVisible = true;
  }
  update() {
    var key = (this.dataSource.key());

    (this.dataSource.store().update(
      this.formData[key],
      this.formData
    ));
    (this.dataSource.store()).load();
    this.onCreateSuccess.emit();
    this.editorVisible = false;
    notify("数据提交成功", "success");
  }

  getItemTreeView(item: Cell) {
    var v = new View();
    v.dataSource = item.editorOptions.dataSource;
    v.viewType = 'tree-list';
    v.items = [];
    v.cols = [];

    // v.title;
    return v;
  }
}
