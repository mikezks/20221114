import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private oauthService: OAuthService) {}

  get userName(): string {
    const claims: Record<string, any> = this.oauthService.getIdentityClaims();
    return claims ? claims['given_name'] : null;
  }

  login(): void {
    this.oauthService.initLoginFlow();
  }

  logout(): void {
    this.oauthService.logOut();
  }
}
