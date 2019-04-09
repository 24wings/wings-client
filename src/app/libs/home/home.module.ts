import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { RouterModule } from "@angular/router";
import { HomePageComponent } from "./pages/home-page/home-page.component";
import { PersonalPageComponent } from "./pages/personal-page/personal-page.component";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { DesignPageComponent } from "./pages/design-page/design-page.component";

@NgModule({
  declarations: [HomePageComponent, PersonalPageComponent, DesignPageComponent],
  imports: [
    HttpClientModule,
    CommonModule,
    SharedModule.forRoot(),
    RouterModule.forChild([
      { path: "", component: HomePageComponent },
      { path: "personal", component: PersonalPageComponent },
      { path: "design", component: DesignPageComponent }
    ])
  ]
})
export class HomeModule {}
