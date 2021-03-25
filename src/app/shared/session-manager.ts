import {LoginResponse} from "../api-module/model/loginResponse";
import {Router} from "@angular/router";


export class SessionManager {
  USER_KEY: string = 'user';
  EXPIRATION_KEY: string = 'expiration';
  URL_KEY: string = 'server_url';
  private storage: Storage = sessionStorage;

  constructor() {}

  login(loginResponse: LoginResponse, url: string) {
    this.storage.setItem(this.USER_KEY, loginResponse.access_token);
    let expirationSecs = (+loginResponse.expires_in) ;
    let currentDate = new Date();
    currentDate.setSeconds(currentDate.getSeconds() + expirationSecs);
    console.log(currentDate);
    this.storage.setItem(this.EXPIRATION_KEY, currentDate.toString());
    this.storage.setItem(this.URL_KEY, url);
    console.log(this.storage.getItem(this.URL_KEY));
  }

  getBasePath() {
    const basep = this.storage.getItem(this.URL_KEY);
    return basep;
  }

  logout(){
    console.log('logging out user');
    this.storage.removeItem(this.USER_KEY);
    this.storage.removeItem(this.URL_KEY);
    //this.storage.removeItem(this.EXPIRATION_KEY);
  }

  checkSession():string {
    let accessToken = this.storage.getItem(this.USER_KEY);
    let exp = this.storage.getItem(this.EXPIRATION_KEY)
    var expirationTime : Date  = new Date(exp);
    var currentTime : Date = new Date();
    if (currentTime > expirationTime) {
      console.log('Your session timed out at: ' + expirationTime);
      this.logout();
    }
    return accessToken;
  }

}
