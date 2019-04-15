import { View, TreeListView } from "src/app/shared/dto/View";
import { DxiDataGridColumn } from "devextreme-angular/ui/nested/base/data-grid-column-dxi";
import DevExpress from "devextreme/bundles/dx.all";
import LocalStore from "devextreme/data/local_store";
import { EditorType } from "./editor-type";
import DataSource from "devextreme/data/data_source";
type EditorOptions = DevExpress.ui.dxTextBoxOptions;

export let menuView: TreeListView = {
  title: "菜单管理",
  parentIdExpr: "parentId",
  keyExpr: "id",
  dataSource: new DataSource({
    store: new LocalStore({
      key: "id",
      immediate: true,
      name: "local-menu",
      flushInterval: 1000
    })
  }),
  viewType: "TreeList",
  cols: [
    {
      dataField: "name",
      caption: "菜单名称",
      dataType: "string"
    } as DxiDataGridColumn,
    {
      dataField: "link",
      caption: "菜单地址",
      dataType: "string"
    } as DxiDataGridColumn,
    {
      dataField: "power",
      caption: "菜单权限",
      dataType: "number"
    } as DxiDataGridColumn
  ],
  items: [
    {
      dataField: "name",
      caption: "菜单名称",
      dataType: "string"
    } as DxiDataGridColumn,
    {
      dataField: "link",
      caption: "菜单地址",
      dataType: "string"
    } as DxiDataGridColumn,
    {
      dataField: "power",
      caption: "菜单权限",
      dataType: "number"
    } as DxiDataGridColumn
  ],
  querys: []
};
