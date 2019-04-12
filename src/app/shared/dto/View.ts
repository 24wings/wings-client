import DevExpress from "devextreme/bundles/dx.all";
import { DxiDataGridColumn } from "devextreme-angular/ui/nested/base/data-grid-column-dxi";
import LocalStore from "devextreme/data/local_store";
export class View {

  /**视图名字 */
  dvo?: string;
  viewType: "table" | "tree-list";
  title: string;
  cols: DxiDataGridColumn[] = [];
  dataSource?: {
    store: LocalStore;

  }

  items: (
    | DevExpress.ui.dxFormSimpleItem
    | DevExpress.ui.dxFormGroupItem
    | DevExpress.ui.dxFormTabbedItem
    | DevExpress.ui.dxFormEmptyItem
    | DevExpress.ui.dxFormButtonItem)[] = [];
}

export class TreeListView extends View {

  keyExpr: string;
  parentIdExpr: string;
}

export class Col {
  label: string;
  dataType: string;
  dataField: string;
}
