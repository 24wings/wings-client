import {
  Component,
  Input,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import DevExpress from "devextreme/bundles/dx.all";
import { DxTreeViewComponent } from "devextreme-angular";

@Component({
  selector: "ws-ref-tree",
  templateUrl: "./ws-ref-tree.component.html",
  styleUrls: ["./ws-ref-tree.component.css"]
})
export class WsRefTreeComponent {
  @Input() set formData(f) {
    debugger;
    this._formData_ = f;
  }
  get formData() {
    return this._formData_;
  }
  _formData_;
  @Input() item: any;
  @ViewChild(DxTreeViewComponent) treeView: DxTreeViewComponent;
  @Output() formDataChange = new EventEmitter();
  treeView_itemSelectionChanged(e) {
    // alert(1);
    const nodes = e.component.getNodes();
    debugger;
    // this.formData[item.dataField] = this.getSelectedRows()
    console.log(e, this.formData);
    // this.treeView.
    // this.treeBoxValue = this.getSelectedItemsKeys(nodes).join(",");
    this._formData_[this.item.dataField] = this.getSelectedItems(nodes).map(
      n => n.itemData
    );
    this.formDataChange.emit(this.formData);
    debugger;

    return false;
  }

  ngOnInit() {
    this.formData;
    debugger;
  }
  syncTreeViewSelection($event) {
    if (!this.treeView) return;
    debugger;
    this.treeView.instance.selectItem($event.itemData);
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
}
