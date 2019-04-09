import { Component, ViewChild } from "@angular/core";
import { environment } from "src/environments/environment";
import * as AspNetData from "devextreme-aspnet-data-nojquery";
import { DxHtmlEditorComponent } from "devextreme-angular";

@Component({
  selector: "post-page",
  templateUrl: "./post-page.component.html",
  styleUrls: ["./post-page.component.css"]
})
export class PostPageComponent {
  postUrl = environment.ip + "/api/blog/Post";
  postCateUrl = environment.ip + "/api/blog/PostCate";
  postTagUrl = environment.ip + "/api/blog/PostTag";
  selectedRow;
  editingContent: string = "";
  editorVisible = false;
  editorPopupVisible = false;
  @ViewChild(DxHtmlEditorComponent) myEditor: DxHtmlEditorComponent;
  dataSource = AspNetData.createStore({
    key: "postId",
    loadUrl: this.postUrl,
    insertUrl: this.postUrl,
    updateUrl: this.postUrl,
    deleteUrl: this.postUrl,
    onBeforeSend: function(method, ajaxOptions) {
      ajaxOptions.xhrFields = { withCredentials: true };
    }
  });
  postCateLookupDataSource = AspNetData.createStore({
    key: "postCateId",
    loadUrl: this.postCateUrl,
    insertUrl: this.postCateUrl,
    updateUrl: this.postCateUrl,
    deleteUrl: this.postCateUrl
  });
  postTagLookupDataSource = AspNetData.createStore({
    key: "postTagId",
    loadUrl: this.postTagUrl,
    insertUrl: this.postTagUrl,
    updateUrl: this.postTagUrl,
    deleteUrl: this.postTagUrl
  });
  submit = data => {
    this.selectedRow.setValue(this.editingContent);

    this.editorPopupVisible = false;
  };
  reset = editorPopup => {
    // this.editingContent = this.  .content;
    this.editorPopupVisible = false;
  };

  test(data) {
    debugger;
  }

  setCateValue($event) {
    debugger;
  }

  changePostTags($event) {
    debugger;
  }
}
