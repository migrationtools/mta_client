import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Configuration} from '../configuration';
import {BASE_PATH} from '../variables';
import {BehaviorSubject, Observable} from 'rxjs';
import {LoginResponse} from '../model/loginResponse';
import {LoginRequest} from '../model/loginRequest';
import {SharedVariables} from '../../shared/shared-variables';

@Injectable()
export class LoginService {

  private basePath: string;

  // Mock loginresponse - to be deleted when server side integration is done
  private loginResponse = new BehaviorSubject<LoginResponse>(new LoginResponse());

  constructor(protected httpClient: HttpClient, private sharedVars: SharedVariables) {
    this.sharedVars.basePathObs.subscribe(value => {
          this.basePath = value;
        });
  }


  public loginUsingPOST(loginRequest: LoginRequest): Observable<LoginResponse> {


    if (loginRequest.userId === 'guest' && loginRequest.password === 'guest') {
      // Mock response.  Delete this line and use the commented line below for server side integration
      return this.loginResponse.asObservable();
    } else {
      return new BehaviorSubject(null);
    }


/*
    let headers = new HttpHeaders();

    headers = headers.append('Authorization', 'Basic ' + btoa(loginRequest.userId +
      ':' + loginRequest.password));

    return this.httpClient.post<LoginResponse>(`${this.basePath}/auth`,

      '',
      {
        headers: headers
      }
    );
*/
  }

}
