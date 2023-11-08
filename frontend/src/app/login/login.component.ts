import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import {UserService} from "../service/user.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    responseData: any;

    constructor(private service: AuthService, private route: Router, private userService: UserService,) {
        localStorage.clear();
    }

    Login = new FormGroup({
        email: new FormControl("", Validators.email),
        password: new FormControl("", Validators.minLength(6))
    });

    ngOnInit(): void {
    }

    proceedLogin() {
        if (this.Login.valid) {
            this.service.proceedLogin(this.Login.value).subscribe(async result => {
              if (result != null) {

                this.responseData = result;
                localStorage.setItem('token', this.responseData.token)

                const currentUser = await this.responseData.user;
                localStorage.setItem('id', currentUser._id)
                localStorage.setItem('email', currentUser.email)
                localStorage.setItem('name', currentUser.name)
                localStorage.setItem('role', currentUser.role)

                await this.route.navigate([''])
              }
            });
        }
    }
}
