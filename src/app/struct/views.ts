import { View } from "src/app/shared/dto/View";
import { DxiDataGridColumn } from 'devextreme-angular/ui/nested/base/data-grid-column-dxi';
import DevExpress from 'devextreme/bundles/dx.all';
import LocalStore from "devextreme/data/local_store";
import { userView, orgView } from './userView';


export let metaView: View = {

    dvo: "ViewManage",
    title: "元数据设计页面",
    viewType: 'table',
    dataSource: {
        store: new LocalStore({
            key: "id" as any,
            // type: "local",
            name: "meta",
            immediate: true,
            flushInterval: 1000

        })

    },
    cols: [
        { caption: "视图名称", dataType: "string", dataField: "name" },
        { caption: "数据视图模型", dataType: "string", dataField: "dvo" },
        {
            caption: "元数据",
            dataType: "string",
            dataField: "meta",
            calculateDisplayValue: data => (data ? JSON.stringify(data) : "")
        }
    ] as any,
    items: [
        {
            label: { text: "视图名称" },
            dataField: "name",
            editorType: "dxTextBox"
        },
        {
            label: { text: "数据视图模型" },
            dataField: "dvo",
            editorType: "dxTextBox"
        },
        {
            label: { text: "元数据" },
            dataField: "meta",
            editorType: "json" as any,
            template: "jsonTemplate"
        },

    ]
};




export let views: View[] = [metaView, userView, orgView]