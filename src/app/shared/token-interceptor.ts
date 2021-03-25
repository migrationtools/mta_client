import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {SessionManager} from "./session-manager";
import {SharedVariables} from "./shared-variables";
import {map, tap, catchError} from "rxjs/operators";
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{

  constructor(private sessionManager: SessionManager, private router: Router, private sharedVariables: SharedVariables) {
  }
  private storage: Storage = sessionStorage;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let accessToken = this.sessionManager.checkSession();
    let duplicate;
    if (!accessToken) {
      let currentUrl = request.url;
      if (currentUrl === this.sharedVariables.loginUrl) {
        duplicate = request.clone();
        return next.handle(duplicate);
      } else {
        this.router.navigate(['/login']);
      }
    } else {
      duplicate = request.clone({ params: request.params.set('access_token', accessToken) });
      return next.handle(duplicate)
        .pipe(
          map(
            evt => {
              if (evt instanceof HttpResponse ) {
                if (evt.status==401) {
                  this.sessionManager.logout();
                  this.router.navigate(['/login']);
                }
              }
              return evt;
            }
          ),catchError((error: HttpErrorResponse) => {
            if (request.url !== this.sharedVariables.loginUrl) {
              if (error.status === 0) {
                alert('Unable to establish connection with the server ' + error.message);
              } else {
                alert('There was an error loading data - please login and try again ' + error.statusText);
              }
              //this.router.navigate(['/login']);
              return throwError(error);
            }
          }));
    }
  }


}
