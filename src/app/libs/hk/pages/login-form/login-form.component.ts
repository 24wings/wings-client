import { Component } from "@angular/core";
import { AuthService, AppInfoService } from "src/app/shared/services";

@Component({
  selector: "hk-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"]
})
export class LoginFormComponent {
  login = "admin";
  password = "8888";

  constructor(
    private authService: AuthService,
    public appInfo: AppInfoService
  ) {}

  onLoginClick(args) {
    if (!args.validationGroup.validate().isValid) {
      return;
    }

    this.authService.logIn(this.login, this.password);

    args.validationGroup.reset();
  }
}
