import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { LoginFormComponent } from "./pages/login-form/login-form.component";

@NgModule({
  declarations: [LoginFormComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    SharedModule.forRoot(),
    RouterModule.forChild([
      { path: "", redirectTo: "/hk/login" },
      { path: "login", component: LoginFormComponent }

      //   { path: "page", component: PageComponent },
      //   { path: "personal", component: PersonalPageComponent },
      //   { path: "design", component: DesignPageComponent }
    ])
  ]
})
export class HkModule {}
