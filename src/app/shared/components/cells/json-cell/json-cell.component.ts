import {
  Component,
  Input,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { Cell } from "src/app/shared/dto/Cell";
import { JsonEditorOptions, JsonEditorComponent } from "ang-jsoneditor";

@Component({ selector: "json-cell", templateUrl: "./json-cell.component.html" })
export class JsonCellComponent {
  editorVisible: boolean = false;
  @Input() item: Cell;
  @Input() value: any;

  popupVisible: boolean = false;
  //   view: View;
  public editorOptions: JsonEditorOptions;
  public data: any;
  @Output() valueChange = new EventEmitter();
  @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

  constructor() {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.modes = ["code", "text", "tree", "view"]; // set all allowed modes
    //this.options.mode = 'code'; //set only one mode
  }
  sync($event) {
    if ($event.isTrusted) {
      this.value = this.editor.get();
      this.valueChange.emit(this.value);
    }
  }
}
