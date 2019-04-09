import { ngModuleJitUrl } from "@angular/compiler";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { SqlmapPageComponent } from "./pages/sqlmap-page/sqlmap-page.component";
import { RouterModule } from "@angular/router";
import { HostPageComponent } from "./pages/host-page/host-page.component";

@NgModule({
  declarations: [SqlmapPageComponent, HostPageComponent],
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      { path: "host", component: HostPageComponent },

      { path: "sqlmap", component: SqlmapPageComponent }
    ])
  ]
})
export class SqlInjectModule {}
