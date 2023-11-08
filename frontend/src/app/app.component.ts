import {Component, DoCheck} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
    title = 'project3';
    displayMenu = false;
    // @ts-ignore
    currentUrl: string = "";

    constructor(private route: Router, private router: Router) {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            // @ts-ignore
            .subscribe((event: NavigationEnd) => {
                this.currentUrl = event.url;
            });
    }

    ngDoCheck(): void {
        if (this.route.url == '/login') {
            this.displayMenu = false
        } else {
            this.displayMenu = true
        }
    }

    protected readonly localStorage = localStorage;
}
