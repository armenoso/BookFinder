﻿import { Injectable } from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';


// Avoid name not found warnings
declare var Auth0Lock: any;


@Injectable()
export class Auth {
    // Configure Auth0
    lock = new Auth0Lock('InTApgT5tI7DGtP0QOVeCxBUj4UX7wK6', 'armenoso.eu.auth0.com', {});

    constructor(private router: Router) {
        // Add callback for lock `authenticated` event
        this.lock.on("authenticated", (authResult) => {
            localStorage.setItem('id_token', authResult.idToken);
        });
    }

    public login() {
        // Call the show method to display the widget.
        this.lock.show();
    }

    public authenticated() {
        // Check if there's an unexpired JWT
        // This searches for an item in localStorage with key == 'id_token'
        return tokenNotExpired();
    }

    public logout() {
        // Remove token from localStorage
        this.router.navigateByUrl('/');
        localStorage.removeItem('id_token');
    }
}