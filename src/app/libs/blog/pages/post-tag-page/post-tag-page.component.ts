import { Component } from "@angular/core";
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { environment } from "src/environments/environment";
@Component({
  selector: "post-tag-page",
  templateUrl: "./post-tag-page.component.html"
})
export class PostTagPageComponent {
  postCateUrl = environment.ip + "/api/blog/PostTag";

  dataSource = AspNetData.createStore({
    key: "postTagId",
    loadUrl: this.postCateUrl,
    insertUrl: this.postCateUrl,
    updateUrl: this.postCateUrl,
    deleteUrl: this.postCateUrl
  });
}
