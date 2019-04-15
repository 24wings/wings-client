import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginFormComponent } from "./shared/components";
import { AuthGuardService } from "./shared/services";
import { HomeComponent } from "./pages/home/home.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { DisplayDataComponent } from "./pages/display-data/display-data.component";
import {
  DxDataGridModule,
  DxFormModule,
  DxPopupModule
} from "devextreme-angular";
import { SharedModule } from "./shared/shared.module";
import { SingleCardModule } from "./layouts";

const routes: Routes = [
  { path: "hk", loadChildren: "./libs/hk/hk.module#HkModule" },
  { path: "home", loadChildren: "./libs/home/home.module#HomeModule" },

  { path: "admin/blog", loadChildren: "./libs/blog/blog.module#BlogModule" },
  {
    path: "admin/sql-inject",
    loadChildren: "./libs/sql-inject/sql-inject.module#SqlInjectModule"
  },
  { path: "admin/rbac", loadChildren: "./libs/rbac/rbac.module#RbacModule" },
  { path: "admin/xss", loadChildren: "./libs/xss/xss.module#XSSModule" },
  { path: "admin/task", loadChildren: "./libs/task/task.module#TaskModule" },
  {
    path: "admin/worker",
    loadChildren: "./libs/worker/worker.module#WorkerModule"
  },
  {
    path: "display-data",
    component: DisplayDataComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  { path: "", redirectTo: "hk/login", pathMatch: "full" },
  // {
  //   path: "home",
  //   component: HomeComponent,
  //   canActivate: [AuthGuardService]
  // },
  {
    path: "login-form",
    component: LoginFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "**",
    redirectTo: "home",
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    DxDataGridModule,
    DxFormModule,
    SharedModule,
    DxPopupModule,
    SingleCardModule
  ],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [HomeComponent, ProfileComponent, DisplayDataComponent]
})
export class AppRoutingModule {}
