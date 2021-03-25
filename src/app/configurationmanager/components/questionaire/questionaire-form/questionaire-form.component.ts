import { Component, OnInit } from '@angular/core';
import {AppIdDetail} from '../../../../api-module/model/appIdDetail';
import {ApplicationType} from '../../../../api-module/model/applicationType';
import {Router} from '@angular/router';

@Component({
  selector: 'app-questionaire-form',
  templateUrl: './questionaire-form.component.html',
  styleUrls: ['./questionaire-form.component.scss']
})
export class QuestionaireFormComponent implements OnInit {

  constructor(private router: Router) { }
  dataLoadComplete = false;
  private appIdDetail: AppIdDetail;
  private appIds: Array<number> = new Array<number>(1, 2, 3);
  private appNames: Array<string> = new Array<string>('First App', 'Second App', 'Third App');
  private appTypes: Array<string> = new Array<string>('PAA', 'HDPA', 'HRA', 'OTHER');
  private userAccessTypes: Array<string> = new Array<string>('Internal', 'External', 'Both');
  private databaseTypes: Array<string> = new Array<string>('Oracle', 'MSSQL', 'MySql', 'MongoDB', 'DB2');
  private loggingProviders: Array<string> = new Array<string>('Splunk', 'None', 'Other');
  private monitoringFrameworks: Array<string> = new Array<string>('AppDynamics', 'DynaTrace', 'eG Enterprise');
  private microsoftLibs: Array<string> = new Array<string>('MS_DLL1', 'MS_DLL2', 'MS_DLL3');
  private thirdPartyLibs: Array<string> = new Array<string>('VEND_DLL1', 'VEND_DLL2', 'VEND_DLL3');
  private inhouseLibs: Array<string> = new Array<string>('INH_DLL1', 'INH_DLL2', 'INH_DLL3');

  ngOnInit() {
    this.appIdDetail = {};
    this.dataLoadComplete = true;
  }

  reset() {
    this.appIdDetail = {};
  }

  evaluate() {
    const promise = this.router.navigate(['/configurationmanager/questionaire/results/', this.appIdDetail.appId]);
    console.log(promise);
  }

  loadAppDetails(selectedAppId) {
    this.appIdDetail = {};
    this.appIdDetail.appId = selectedAppId;
    this.appIdDetail.applicationName = this.appNames[this.appIdDetail.appId - 1];
    this.appIdDetail.applicationType = this.appTypes[this.appIdDetail.appId - 1];
    this.appIdDetail.accessType = this.userAccessTypes[this.appIdDetail.appId - 1];
    this.appIdDetail.databaseType = this.databaseTypes[this.appIdDetail.appId - 1];
    this.appIdDetail.git_url = 'https://git.wellsfargo.net/enterprise_apps/' + this.appIdDetail.applicationName;
    this.appIdDetail.inHouseLibs = new Array<string>(this.inhouseLibs[this.appIdDetail.appId - 1]);
    this.appIdDetail.thirdPartyLibs = new Array<string>(this.thirdPartyLibs[this.appIdDetail.appId - 1]);
    this.appIdDetail.microsoftLibs = new Array<string>(this.microsoftLibs[this.appIdDetail.appId - 1]);
    this.appIdDetail.logging_provider = this.loggingProviders[this.appIdDetail.appId - 1];
    this.appIdDetail.monitoring_framework = this.monitoringFrameworks[this.appIdDetail.appId - 1];

  }
}
