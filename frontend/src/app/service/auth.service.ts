import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UserService} from "./user.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  signInUrl = environment.api+'auth/login';

  constructor(private http: HttpClient, private _userService: UserService) {
  }

  proceedLogin(UserCred: any) {
    return this.http.post(this.signInUrl, UserCred);
  }

  async isLoggedIn() {
    const currentUser = await this._userService.getCurrentUser();
    return currentUser._id == localStorage.getItem('id');
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }

  async isSuperAdmin() {
    const currentUser = await this._userService.getCurrentUser();
    return currentUser.role == "superadmin";
  }
}
