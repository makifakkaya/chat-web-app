import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private service: AuthService, private route: Router) {
    }

    async canActivate() {
      if (await this.service.isLoggedIn()) {
        return true;
      } else {
          await this.route.navigate(['login']); // [''] olan kısmı 'string' tipinde bir rotaya değiştirdim
        return false;
      }
    }
}
