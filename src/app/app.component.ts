import { Component, HostBinding } from "@angular/core";
import { AuthService, ScreenService, AppInfoService } from "./shared/services";
import { locale, loadMessages, formatMessage } from "devextreme/localization";
import "devextreme-intl";

// import "devextreme/localization/globalize/number";
// import "devextreme/localization/globalize/date";
// import "devextreme/localization/globalize/currency";
// import "devextreme/localization/globalize/message";
// import * as supplementalCldrData from "npm:devextreme-cldr-data/supplemental.json!json";
//import deMessages from 'npm:devextreme/localization/messages/de.json!json';
// import * as deMessages from "devextreme/localization/messages/de.json";
// import * as zhMessages from "devextreme/localization/messages/zh.json";
import { HttpClient } from "@angular/common/http";
//import ruMessages from 'npm:devextreme/localization/messages/ru.json!json';
// import { zh } from "./locale/zh";
// import Globalize from "globalize";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  @HostBinding("class") get getClass() {
    return Object.keys(this.screen.sizes)
      .filter(cl => this.screen.sizes[cl])
      .join(" ");
  }
  initMessages() {
    // loadMessages(zh);
    // Globalize.loadMessages(this.service.getDictionary());
    // Globalize.load(zh);
    //loadMessages(ruMessages);
    // sessionStorage.setItem("locale", JSON.stringify(zh) as any);
    locale("zh");
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  constructor(
    private authService: AuthService,
    private screen: ScreenService,
    public appInfo: AppInfoService,
    public httpClient: HttpClient
  ) {
    this.initMessages();
  }

  isAutorized() {
    return this.authService.isLoggedIn;
  }
}
