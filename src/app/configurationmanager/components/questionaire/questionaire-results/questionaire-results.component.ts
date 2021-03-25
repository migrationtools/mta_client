import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {el} from '@angular/platform-browser/testing/src/browser_util';

@Component({
  selector: 'app-questionaire-results',
  templateUrl: './questionaire-results.component.html',
  styleUrls: ['./questionaire-results.component.scss']
})
export class QuestionaireResultsComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  pageTitle = 'Application Analysis Results';
  dataLoadComplete = true;
  appId: string;
  failureMessages: Array<string> = new Array<string>('Application uses odbc drivers for database connectivity');
  successMessages: Array<string> = new Array<string>('Upgrade path available for MS_DLL1 and VEND_DLL2');
  migrationCandidate: boolean;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.appId = params['appId'];
    });

    if (this.appId === '2') {
      this.migrationCandidate = false;
    } else {
      this.migrationCandidate = true;
    }

  }


}
