import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
    providedIn: 'root'
})
export class SuperAdminGuard implements CanActivate {
    constructor(private service: AuthService, private route: Router) {
    }

    async canActivate() {
        if (await this.service.isSuperAdmin()) {
            return true;
        } else {
            await this.route.navigate(['']);
            return false;
        }
    }
}
