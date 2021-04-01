import { Component, OnInit } from '@angular/core';
import {SessionManager} from "../../../../shared/session-manager";
import {MtaFoldernameDto} from "../../../../api-module/model/mta-foldername-dto";
import {WeblogicTomcatAnalysisService} from "../../../../api-module/api/weblogic-tomcat-analysis-service";

@Component({
  selector: 'app-mta-analysis-list',
  templateUrl: './mta-analysis-list.component.html',
  styleUrls: ['./mta-analysis-list.component.scss']
})
export class MtaAnalysisListComponent implements OnInit {
  wtcFolderNameDto: MtaFoldernameDto[];
  folderName= 'Folder Name';
  date= 'Created-Modified Date';


  basePath= this.sessionManager.getBasePath();

  constructor(private weblogicTomcatAnalysisService: WeblogicTomcatAnalysisService, private sessionManager: SessionManager) { }

  ngOnInit() {
    this.weblogicTomcatAnalysisService.getDirectoryListByDescendingDate().subscribe(wtcFolderNameDto =>{
      this.wtcFolderNameDto = wtcFolderNameDto;
    });
  }
  getFoldersList(): MtaFoldernameDto[] {
    return this.wtcFolderNameDto;

  }


}
