import { mock } from "mockjs";
import { Component, ViewChild, HostListener } from "@angular/core";
import { JsonEditorOptions, JsonEditorComponent } from "ang-jsoneditor";
import { View } from "src/app/shared/dto/View";
@Component({
  selector: "design-page",
  templateUrl: "./design-page.component.html",
  styleUrls: ["./design-page.component.css"]
})
export class DesignPageComponent {
  popupVisible: boolean = false;
  public editorOptions: JsonEditorOptions;
  public data: any;
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;
  designView = {
    key: "id",
    dvo: "ViewManage",
    title: "",
    viewType: "table",
    cols: [
      { caption: "视图名称", dataType: "string", dataField: "name" },
      { caption: "数据视图模型", dataType: "string", dataField: "dvo" },
      {
        caption: "元数据",
        dataType: "string",
        dataField: "meta",
        calculateDisplayValue: data => (data ? JSON.stringify(data) : "")
      }
    ] as any,
    items: [
      {
        label: { text: "视图名称" },
        dataField: "name",
        editorType: "dxTextBox"
      },
      {
        label: { text: "数据视图模型" },
        dataField: "dvo",
        editorType: "dxTextBox"
      },
      {
        label: { text: "元数据" },
        dataField: "meta",
        editorType: "json" as any,
        template: "jsonTemplate"
      }
    ]
  };

  constructor() {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.modes = ["code", "text", "tree", "view"]; // set all allowed modes
    //this.options.mode = 'code'; //set only one mode

    // this.view =
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  list() {
    this.popupVisible = true;
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    document.addEventListener("keyup", e => {
      if (e.code == "MetaLeft") {
        this.list();
      }
    });
  }

  json;

  warn() {
    alert(1);
  }

  log($event) {
    console.log($event);
  }
  selectedView;

  doAction($event: { eventName; data }) {
    console.log($event);
    if ($event.data.meta) {
      this.selectedView = $event.data.meta;
    }
  }
}
