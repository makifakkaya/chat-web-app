import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpService} from "./http.service";
import {User, UserSaveModel, UserUpdateModel} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private _httpService: HttpService) {
  }

  list(): Promise<User[]> {
    return new Promise<User[]>((resolve, reject) => {
      this._httpService.get<any>("users/list", (res) => {
        // @ts-ignore
        const userList: User[] = res;
        resolve(userList);
      });
    });
  }

  getCurrentUser(): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this._httpService.get<any>("users/"+localStorage.getItem("id"), (res) => {
        // @ts-ignore
        const user: User = res;
        resolve(user);
      });
    });
  }

  getById(id: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this._httpService.get<any>(`users/${id}`, (res) => {
        // @ts-ignore
        const user: User = res;
        resolve(user);
      });
    });
  }

/*
  save(model: UserSaveModel): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this._httpService.post<any>(environment.authService, `Users`, model, (res) => {
        // @ts-ignore
        const user: User = res.result.users[0];
        resolve(user);
      });
    });
  }

  update(model: UserUpdateModel): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this._httpService.put<any>(environment.authService, `Users`, model, (res) => {
        // @ts-ignore
        const user: User = res.result.users[0];
        resolve(user);
      });
    });
  }

  deleteById(id: string): Promise<User> {
    return new Promise<User>((resolve, reject) => {
      this._httpService.delete<any>(environment.authService, `Users?id=${id}`, (res) => {
        // @ts-ignore
        const user: User = res.result.users[0];
        resolve(user);
      });
    });
  }
*/
}
