import { NgModule, ModuleWithProviders } from "@angular/core";
import {
  DxDataGridModule,
  DxTreeListModule,
  DxPopupModule,
  DxSwitchModule,
  DxButtonModule,
  DxTextAreaModule,
  DxTextBoxModule,
  DxSelectBoxModule,
  DxHtmlEditorModule,
  DxTemplateDirective,
  DxTemplateHost,
  DxTemplateModule,
  DxTagBoxModule,
  DxMenuModule,
  DxCheckBoxModule,
  DxNavBarModule,
  DxToolbarModule,
  DxButtonGroupModule,
  DxFormModule,
  DxRadioGroupComponent,
  DxRadioGroupModule,
  DxTreeViewModule,
  DxDropDownBoxModule
} from "devextreme-angular";
import { CommonModule } from "@angular/common";
import { HostService } from "./services/host.service";
import { DbService } from "./services/db.service";
import { SqlMapService } from "./services/sqlmap.service";
import { SingleCardModule } from "../layouts/single-card/single-card.component";
import { WsViewComponent } from "./components/ws-view/ws-view.component";
import { WsEditorComponent } from "./components/ws-editor/ws-editor.component";
import { StringColComponent } from "./components/cols/string-col/string-col.component";
import { DxiButtonModule } from "devextreme-angular/ui/nested/button-dxi";
import {
  DxiItemComponent,
  DxiItemModule
} from "devextreme-angular/ui/nested/item-dxi";
import { FormsModule } from "@angular/forms";
import { NgJsonEditorModule } from "ang-jsoneditor";
import { JsonCellComponent } from "./components/cells/json-cell/json-cell.component";
import { DynamicColComponent } from "./components/cols/dynamic-col.component";
import { DynamicCellComponent } from "./components/cells/dynamic-cell.component";
import { DynamicColDirective } from "./components/cols/dynamic-col.directive";
import { DynamicCellDirective } from "./components/cells/dynamic-cell.directive";
import { cellComponentRegister } from "./components/cells/cell.component.register";
import { DynamicComponentModule } from "ng-dynamic";
var cellComponents = cellComponentRegister.map(r => r.component);

@NgModule({
  imports: [
    DynamicComponentModule.forRoot({}),
    DxTagBoxModule,
    CommonModule,
    DxTextAreaModule,
    DxDataGridModule,
    DxTreeListModule,
    DxPopupModule,
    DxSwitchModule,
    DxButtonModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    DxHtmlEditorModule,
    DxTemplateModule,
    SingleCardModule,
    DxMenuModule,
    DxCheckBoxModule,
    DxNavBarModule,
    DxToolbarModule,
    DxiButtonModule,
    DxButtonGroupModule,
    DxiItemModule,
    FormsModule,
    DxFormModule,
    NgJsonEditorModule,
    DxRadioGroupModule,
    DxTreeViewModule,
    DxDropDownBoxModule
  ],
  exports: [
    DxTagBoxModule,
    DxDataGridModule,
    DxTreeListModule,
    DxPopupModule,
    DxSwitchModule,
    DxButtonModule,
    CommonModule,
    DxTextAreaModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    DxHtmlEditorModule,
    DxTemplateModule,
    SingleCardModule,
    DxMenuModule,
    DxCheckBoxModule,
    DxNavBarModule,
    DxToolbarModule,
    WsViewComponent,
    WsEditorComponent,
    StringColComponent,
    DxiButtonModule,
    DxButtonGroupModule,
    DxiItemModule,
    FormsModule,
    DxFormModule,
    NgJsonEditorModule,
    JsonCellComponent,
    DynamicColComponent,
    DynamicCellComponent,
    DxRadioGroupModule,
    DxTreeViewModule,
    DxDropDownBoxModule,
    ...cellComponents
  ],
  declarations: [
    WsViewComponent,
    WsEditorComponent,
    StringColComponent,
    JsonCellComponent,
    DynamicColComponent,
    DynamicCellComponent,
    DynamicColDirective,
    DynamicCellDirective,
    ...cellComponents
  ],
  providers: [HostService, SqlMapService, DbService, DxTemplateHost],
  entryComponents: [...cellComponents]
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [HostService, DbService, SqlMapService]
    };
  }
}
