import { View, TreeListView } from "src/app/shared/dto/View";
import { DxiDataGridColumn } from "devextreme-angular/ui/nested/base/data-grid-column-dxi";
import DevExpress from "devextreme/bundles/dx.all";
import LocalStore from "devextreme/data/local_store";
import { EditorType } from "./editor-type";
import DataSource from "devextreme/data/data_source";
type EditorOptions = DevExpress.ui.dxTextBoxOptions;

export let userView: View = {
  title: "用户管理界面",

  dataSource: new DataSource({
    store: new LocalStore({
      key: "id",
      immediate: true,
      name: "local-user",
      flushInterval: 1000
    })
  }),
  viewType: "Table",
  cols: [
    {
      dataField: "name",
      caption: "姓名",
      dataType: "string"
    } as DxiDataGridColumn,
    {
      dataField: "username",
      caption: "用户名",
      dataType: "string"
    } as DxiDataGridColumn,
    {
      dataField: "password",
      caption: "密码",
      dataType: "string"
    } as DxiDataGridColumn,
    {
      dataField: "org",
      caption: "所在组织",
      calculateDisplayValue: function(user) {
        return user.org ? user.org.orgName : "";
      }
    } as any
  ],
  items: [
    {
      dataField: "name",
      label: { text: "姓名" },
      dataType: "string"
    } as DevExpress.ui.dxFormSimpleItem,
    {
      dataField: "username",
      label: { text: "用户名" },
      dataType: "string"
    } as DevExpress.ui.dxFormSimpleItem,
    {
      dataField: "password",
      label: { text: "密码" },
      editorType: "dxTextBox",
      editorOptions: { mode: "password" } as EditorOptions
    } as DevExpress.ui.dxFormSimpleItem,
    {
      dataField: "org",
      label: { text: "所在组织" },
      editorType: "wsRefTree" as any,
      editorOptions: {
        dxTreeView: {
          dataSource: new DataSource(
            new LocalStore({
              key: "id",
              immediate: true,
              name: "local-org",
              flushInterval: 1000
            })
          ),
          selectionMode: "single",
          keyExpr: "id",
          valueExpr: "id",
          displayExpr: "orgName",
          parentIdExpr: "parentId",
          placeholder: "Select a value..."
        }
      }
    }
  ]
};

export let orgView: TreeListView = {
  parentIdExpr: "parentId",
  keyExpr: "id",
  title: "组织管理",
  viewType: "TreeList",
  dataSource: new DataSource({
    store: new LocalStore({
      key: "id",
      immediate: true,
      name: "local-org",
      flushInterval: 1000
    })
  }),
  cols: [
    {
      dataField: "orgName",
      caption: "组织名称",
      dataType: "string"
    } as DxiDataGridColumn,
    {
      dataField: "createTime",
      caption: "创建时间",
      dataType: "date"
    } as DxiDataGridColumn
  ],
  items: [
    {
      dataField: "orgName",
      label: { text: "组织名称" },
      dataType: "string"
    } as DevExpress.ui.dxFormSimpleItem,

    {
      dataField: "createTime",
      label: { text: "创建时间" },
      dataType: "date",
      editorType: "dxDateBox" as EditorType
    } as DevExpress.ui.dxFormSimpleItem
  ],
  querys: [
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
          selectionMode: "single",
          keyExpr: "id",
          displayExpr: "name",
          parentIdExpr: "parentId",
          placeholder: "勾选菜单列表"
        }
      }
    } as DevExpress.ui.dxFormSimpleItem
  ]
};
