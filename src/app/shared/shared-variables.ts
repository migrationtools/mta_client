import {BehaviorSubject} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedVariables {
  protected basePath: string;
  public basePathObs = new BehaviorSubject<string>(null);
  public loginUrl: string;
  private mtaArchiveFolderName = new BehaviorSubject<string>(null);
  sharedMtaArchiveFolderName = this.mtaArchiveFolderName.asObservable();


  public getBasePath() {
    return this.basePath;
  }

  public setBasePath(basePathArg: string) {
    this.basePathObs.next(basePathArg);
    this.basePathObs.subscribe(value => {
      this.basePath = value;
      this.loginUrl = value + '/auth';
    });
  }

  public setMtaArchiveFolderName(mtaArchiveFolderName: string) {
    this.mtaArchiveFolderName.next(mtaArchiveFolderName);
  }


}
