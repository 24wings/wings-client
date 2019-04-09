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
  DxFormModule
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
@NgModule({
  imports: [
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
    NgJsonEditorModule
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
    DynamicCellComponent
  ],
  declarations: [
    WsViewComponent,
    WsEditorComponent,
    StringColComponent,
    JsonCellComponent,
    DynamicColComponent,
    DynamicCellComponent
  ],
  providers: [HostService, SqlMapService, DbService, DxTemplateHost]
})
export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [HostService, DbService, SqlMapService]
    };
  }
}
