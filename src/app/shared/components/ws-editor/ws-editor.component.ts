import {
  Component,
  Input,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { View } from "../../dto/View";
import { DxFormComponent } from "devextreme-angular";
import DevExpress from "devextreme/bundles/dx.all";
import { Cell, DataSource } from "../../dto/Cell";
import LocalStore from "devextreme/data/local_store";
import notify from "devextreme/ui/notify";
import { confirm } from "devextreme/ui/dialog";
@Component({ selector: "ws-editor", templateUrl: "ws-editor.component.html" })
export class WsEditorComponent {
  @ViewChild(DxFormComponent) dxForm: DxFormComponent;
  editorVisible = false;
  @Input() dataSource: DataSource;

  formData = {};
  v;
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
  onFormSubmit() {
    if (this.mode == "create") {
      (this.dataSource.store as LocalStore).insert(this.formData);
      (this.dataSource.store as LocalStore).load();
      this.onCreateSuccess.emit();
      this.editorVisible = false;
      notify("数据提交成功", "success");
    } else {
      this.update();
    }
  }

  openNewModal() {
    this.editorVisible = true;
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }
  selectedRows = [];
  setSelectedRows($event) {
    this.selectedRows = $event;
  }
  async deleteSelected() {
    var sure = await confirm("你确定要删除这些记录?", "提示");
    if (sure) {
      this.selectedRows.forEach(row => {
        var key = (this.dataSource.store as LocalStore).key();
        (this.dataSource.store as LocalStore).remove(row[key]);
      });
    }
    this.onCreateSuccess.emit();
  }
  log(data) {
    console.log(data);
  }
  mode: "create" | "update" | "info" = "create";
  openUpdateModel() {
    this.mode = "update";
    this.formData = this.selectedRows[0];
    this.editorVisible = true;
  }
  update() {
    var key = (this.dataSource.store as LocalStore).key();

    (this.dataSource.store as LocalStore).update(
      this.formData[key],
      this.formData
    );
    (this.dataSource.store as LocalStore).load();
    this.onCreateSuccess.emit();
    this.editorVisible = false;
    notify("数据提交成功", "success");
  }
}
