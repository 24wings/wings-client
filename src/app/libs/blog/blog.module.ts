import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { PostPageComponent } from "./pages/post-page/post-page.component";
import { RouterModule } from "@angular/router";
import { PostTagPageComponent } from "./pages/post-tag-page/post-tag-page.component";
import { PostCatePageComponent } from "./pages/post-cate-page/post-cate-page.component";

@NgModule({
  imports: [
    SharedModule.forRoot(),
    RouterModule.forChild([
      { path: "post", component: PostPageComponent },
      { path: "post-tag", component: PostTagPageComponent },
      { path: "post-cate", component: PostCatePageComponent }
    ])
  ],
  declarations: [PostPageComponent, PostTagPageComponent, PostCatePageComponent]
})
export class BlogModule {}
