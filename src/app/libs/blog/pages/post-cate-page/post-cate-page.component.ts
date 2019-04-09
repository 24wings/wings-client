import { Component } from "@angular/core";
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { DxHtmlEditorComponent } from "devextreme-angular";
import { environment } from "src/environments/environment";
@Component({
  selector: "post-cate-page",
  templateUrl: "./post-cate-page.component.html"
})
export class PostCatePageComponent {
  postCateUrl = environment.ip + "/api/blog/PostCate";

  dataSource = AspNetData.createStore({
    key: "postCateId",
    loadUrl: this.postCateUrl,
    insertUrl: this.postCateUrl,
    updateUrl: this.postCateUrl,
    deleteUrl: this.postCateUrl
  });
}
