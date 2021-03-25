import { Injectable } from '@angular/core';
import {ArchCheckconfiguration} from "../models/archcheckconfiguration";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private _configurations: BehaviorSubject<ArchCheckconfiguration[]>;

  private dataStore: {
    configurations: ArchCheckconfiguration[]
  }

  constructor(private http: HttpClient) {
    this.dataStore = {configurations: []};
    this._configurations = new BehaviorSubject(<ArchCheckconfiguration[]>([]));
  }

  get configurations(): Observable<ArchCheckconfiguration[]> {
    return this._configurations.asObservable();
  }


  loadAll() {
    const configurationsUrl = 'http://localhost:8081/api/configurations'
    return this.http.get<ArchCheckconfiguration[]>(configurationsUrl)
      .subscribe(data => {
        this.dataStore.configurations = data;
        this._configurations.next(Object.assign({},this.dataStore).configurations)
        },
          error => {
        console.log("unable to fetch configurations")
      });
  }
}
