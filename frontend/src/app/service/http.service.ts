import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(private _http: HttpClient) {
    }

    setApi(endpoint: string) {
        return environment.api + endpoint;
    }

    get<T>(endpoint: string, callBack: (res: HttpEvent<T>) => void, options: any = {}) {
        let apiUrl = this.setApi(endpoint);
        this._http.get<T>(apiUrl, options).subscribe({
            next: (res) => callBack(res),
        })
    }

    post<T>(endpoint: string, model: any, callBack: (res: HttpEvent<T>) => void, options: any = {}) {
        let apiUrl = this.setApi(endpoint);

        this._http.post<T>(apiUrl, model, options).subscribe({
            next: (res) => callBack(res),
        })
    }

    put<T>(endpoint: string, model: any, callBack: (res: HttpEvent<T>) => void, options: any = {}) {
        let apiUrl = this.setApi(endpoint);

        this._http.put<T>(apiUrl, model, options).subscribe({
            next: (res) => callBack(res),
        })
    }

    delete<T>(endpoint: string, callBack: (res: HttpEvent<T>) => void, options: any = {}) {
        let apiUrl = this.setApi(endpoint);

        this._http.delete<T>(apiUrl, options).subscribe({
            next: (res) => callBack(res),
        })
    }
}
