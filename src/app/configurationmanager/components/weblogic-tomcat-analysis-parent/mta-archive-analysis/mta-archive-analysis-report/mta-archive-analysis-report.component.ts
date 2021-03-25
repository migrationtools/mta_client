import {Component, OnInit} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {WeblogicTomcatAnalysisService} from '../../../../../api-module/api/weblogic-tomcat-analysis-service';
import {SharedVariables} from '../../../../../shared/shared-variables';
import {SessionManager} from '../../../../../shared/session-manager';


@Component({
  selector: 'app-mta-archive-analysis-report',
  templateUrl: './mta-archive-analysis-report.component.html',
  styleUrls: ['./mta-archive-analysis-report.component.scss']
})
export class MtaArchiveAnalysisReportComponent implements OnInit {
  mtaArchiveFolderName: string;
  sourceUrl: string;


  constructor(private service: WeblogicTomcatAnalysisService, private shared: SharedVariables, private sessionManager: SessionManager) {

  }


  ngOnInit() {
    this.shared.sharedMtaArchiveFolderName.subscribe(mtaArchiveFolderName => {
      this.mtaArchiveFolderName = mtaArchiveFolderName;
      this.sourceUrl = this.sessionManager.getBasePath() + '/' + this.mtaArchiveFolderName + `/index.html`;
      console.log('Inside Wta Archive analysis' + this.sourceUrl);
    });

  }

}
