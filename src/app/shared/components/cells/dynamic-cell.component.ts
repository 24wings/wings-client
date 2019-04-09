import { Component, Input } from "@angular/core";
import DevExpress from "devextreme/bundles/dx.all";
import { Cell } from "../../dto/Cell";

@Component({
  selector: "dynamic-cell",
  templateUrl: "./dynamic-cell.component.html"
})
export class DynamicCellComponent {
  @Input() item: Cell;
}
