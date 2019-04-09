import DevExpress from "devextreme/bundles/dx.all";
import { DxiDataGridColumn } from "devextreme-angular/ui/nested/base/data-grid-column-dxi";

export class View {
  /**主键 */
  key: string;
  /**视图名字 */
  dvo: string;
  viewType;
  title: string;
  cols: DxiDataGridColumn[] = [];

  items: (
    | DevExpress.ui.dxFormSimpleItem
    | DevExpress.ui.dxFormGroupItem
    | DevExpress.ui.dxFormTabbedItem
    | DevExpress.ui.dxFormEmptyItem
    | DevExpress.ui.dxFormButtonItem)[] = [];
}

export class Col {
  label: string;
  dataType: string;
  dataField: string;
}
