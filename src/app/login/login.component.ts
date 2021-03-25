import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterStateSnapshot} from '@angular/router';
import {LoginService} from '../api-module/api/login.service';
import {LoginRequest} from '../api-module/model/loginRequest';
import {moment} from 'ngx-bootstrap/chronos/test/chain';
import {SECOND} from 'ngx-bootstrap/chronos/units/constants';
import {SessionManager} from '../shared/session-manager';
import {SharedVariables} from '../shared/shared-variables';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginRequest: LoginRequest;
  errMsg = '';
  isLoginSuccess: boolean;
  loadInProgress = false;
  returnUrl: string;
  selectedEnvironment: string;

  constructor(private route: ActivatedRoute, private router: Router, private loginService: LoginService,
              private sessionManager: SessionManager, private sharedVariables: SharedVariables) {
    this.loginRequest = new LoginRequest();
    this.isLoginSuccess = false;
    this.selectedEnvironment = 'http://localhost:8080';
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    console.log(this.returnUrl);
  }

  onKeydown(event) {
    if (event.key === 'Enter') {
      this.login();
    }
  }

  login() {
    this.loadInProgress = true;
    this.errMsg = '';
    this.sharedVariables.setBasePath(this.selectedEnvironment);
    this.loginService.loginUsingPOST(this.loginRequest)
      .subscribe(loginResponse => {
          if (loginResponse !== undefined && loginResponse !== null) {
            this.isLoginSuccess = true;
            this.errMsg = '';
            console.log(loginResponse);
            this.sessionManager.login(loginResponse, this.selectedEnvironment);
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.isLoginSuccess = false;
            this.errMsg = 'Error';
          }
          this.loadInProgress = false;
        },
        err => {
          this.loadInProgress = false;
          switch (err.status) {
            case 401:
              this.errMsg = 'Username or password is incorrect';
              break;
            case 404:
              this.errMsg = 'Service not found';
              break;
            case 408:
              this.errMsg = 'Request Timedout';
              break;
            case 500:
              this.errMsg = 'Internal Server Error';
              break;
            default:
              this.errMsg = 'Server Error';
          }
        });
  }
}
