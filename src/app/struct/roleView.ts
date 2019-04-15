import { View, TreeListView } from "src/app/shared/dto/View";
import { DxiDataGridColumn } from "devextreme-angular/ui/nested/base/data-grid-column-dxi";
import DevExpress from "devextreme/bundles/dx.all";
import LocalStore from "devextreme/data/local_store";
import { EditorType } from "./editor-type";
import DataSource from "devextreme/data/data_source";
import { RequiredValidator } from "@angular/forms";

type EditorOptions = DevExpress.ui.dxTextBoxOptions;

export let roleView: View = {
  title: "角色管理",
  dataSource: new DataSource({
    store: new LocalStore({
      key: "id",
      name: "role",
      immediate: true,
      flushInterval: 1000
    })
  }),
  viewType: "Table",
  cols: [
    {
      dataField: "roleName",
      caption: "角色名",
      dataType: "string"
    } as DxiDataGridColumn,
    {
      dataField: "menus",
      caption: "菜单",
      dataType: "string",
      calculateDisplayValue: function(role) {
        return role.menus ? role.menus.map(m => m.name) : "";
      }
    } as any
  ],
  items: [
    {
      dataField: "roleName",
      label: { text: "角色名" },
      dataType: "string",
      validationRules: [{ type: "required", message: "角色名必填" }],
      isRequired: true
    } as DevExpress.ui.dxFormSimpleItem,

    {
      dataField: "menus",
      label: { text: "角色菜单" },

      editorType: "wsRefTree" as any,
      editorOptions: {
        dxDropbox: {
          displayExpr: "name"
        },
        dxTreeView: {
          dataSource: new DataSource(
            new LocalStore({
              key: "id",
              immediate: true,
              name: "local-menu",
              flushInterval: 1000
            })
          ),
          selectionMode: "multiple",
          keyExpr: "id",
          displayExpr: "name",
          parentIdExpr: "parentId",
          placeholder: "勾选菜单列表"
        }
      }
    } as DevExpress.ui.dxFormSimpleItem
  ]
};
