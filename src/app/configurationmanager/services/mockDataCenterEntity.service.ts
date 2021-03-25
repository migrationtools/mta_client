import {Injectable} from '@angular/core';
import {Observable} from "rxjs";


@Injectable()
export class MockDimDataCenterEntityService {

  constructor() {

  }

  value: Value = new Value(
      [{
        'rel' : 'self',
        'href' : 'http://localhost:8080/api/dimDataCenters{?page,size,sort}'
      }],
      [{
        'dataCenterName': 'LVS',
        'dataCenterDescription': 'Las Vegas Data Center',
        'createTimestamp': '2018-04-06 01:18:55',
        'updateTimestamp': '2018-05-17 01:18:55',
        'links': [{
          'rel': 'self',
          'href': 'http://localhost:8080/api/dimDataCenters/LVS'
        }, {
          'rel': 'dimDataCenter',
          'href': 'http://localhost:8080/api/dimDataCenters/LVS'
        }]},
          {
            'dataCenterName' : 'SLC',
            'dataCenterDescription' : 'Salt Lake City Data Center',
            'createTimestamp' : '2019-04-06 01:18:55',
            'updateTimestamp' : '2019-02-17 01:18:55',
            'links' : [ {
              'rel' : 'self',
              'href' : 'http://localhost:8080/api/dimDataCenters/SLC'
            }, {
              'rel' : 'dimDataCenter',
              'href' : 'http://localhost:8080/api/dimDataCenters/SLC'
            } ]
          }, {
            'dataCenterName' : 'ASH',
            'dataCenterDescription' : 'Ashburn Data Center',
            'createTimestamp' : '2019-06-17 01:18:55',
            'updateTimestamp' : '2019-07-17 01:18:55',
            'links' : [ {
              'rel' : 'self',
              'href' : 'http://localhost:8080/api/dimDataCenters/ASH'
            }, {
              'rel' : 'dimDataCenter',
              'href' : 'http://localhost:8080/api/dimDataCenters/ASH'
            } ]
          }, {
            'dataCenterName' : 'SEC',
            'dataCenterDescription' : 'Secaucus Data Center',
            'createTimestamp' : '2019-08-17 01:18:55',
            'updateTimestamp' : '2019-09-17 01:18:55',
            'links' : [ {
              'rel' : 'self',
              'href' : 'http://localhost:8080/api/dimDataCenters/SEC'
            }, {
              'rel' : 'dimDataCenter',
              'href' : 'http://localhost:8080/api/dimDataCenters/SEC'
            } ]
      }],
      {
        'size' : 20,
        'totalElements' : 4,
        'totalPages' : 1,
        'number' : 0
      }
  );

  public findAllDimDataCenterUsingGET(): any {
    const valueObservable = new Observable(observer => {
      // Remove timeout when going to production as this is just for testing the spinner
      setTimeout(() => {
        observer.next(this.value);
      }, 1000);
    });
    return valueObservable;
  }


}


export class Value {
  constructor(
    public links: Links[],
    public content: DimDataCenterModel[],
    public page: Page
  ) {}
}

export class DimDataCenterModel {
  constructor(
    public dataCenterName: string,
    public dataCenterDescription: string,
    public createTimestamp: string,
    public updateTimestamp: string,
    public links: Links[]
  ) {}

}

export class Links {
  constructor(
      public rel: string,
      public href: string
  ) {}

}

export class Page {
  constructor(
    public size: number,
    public totalElements: number,
    public totalPages: number,
    public number: number
  ) {}
}
