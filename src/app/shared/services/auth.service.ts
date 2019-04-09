import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import notify from "devextreme/ui/notify";
@Injectable()
export class AuthService {
  loggedIn = false;

  constructor(private router: Router, public httpClient: HttpClient) { }

  async logIn(login: string, password: string) {

    // var rtn = await this.httpClient
    //   .post("/api/Auth/Sign/login", { username: login, password })
    //   .toPromise();
    if (login == "admin" && password == "8888") {
      this.loggedIn = true;
      this.router.navigate(["/"]);
    } else {
      notify("用户名或密码错误", "erro");
    }

  }

  logOut() {
    this.loggedIn = false;
    this.router.navigate(["/login-form"]);
  }

  get isLoggedIn() {
    return this.loggedIn;
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn;
    const isLoginForm = route.routeConfig.path === "login-form";

    if (isLoggedIn && isLoginForm) {
      this.router.navigate(["/"]);
      return false;
    }

    if (!isLoggedIn && !isLoginForm) {
      this.router.navigate(["/login-form"]);
    }

    return isLoggedIn || isLoginForm;
  }
}
