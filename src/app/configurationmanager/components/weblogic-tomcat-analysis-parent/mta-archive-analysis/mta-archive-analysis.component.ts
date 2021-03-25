import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {SelectedTarget} from '../../../../api-module/model/selectedTarget';
import {WeblogicTomcatAnalysisService} from '../../../../api-module/api/weblogic-tomcat-analysis-service';
import {UploadArchiveAnalysisDto} from '../../../../api-module/model/uploadArchiveAnalysisDto';
import {SharedVariables} from '../../../../shared/shared-variables';
import {interval} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-mta-archive-analysis',
  templateUrl: './mta-archive-analysis.component.html',
  styleUrls: ['./mta-archive-analysis.component.scss']
})
export class MtaArchiveAnalysisComponent implements OnInit {

  selectedFiles: FileList;
  currentFile: File;
  selectedFile = null;
  commandView: boolean = false;
  message = '';
  uploadArchiveDto: UploadArchiveAnalysisDto;

  fileName: '';
  wtcIndexFileDto: any;
  iframeRender: boolean = false;
  fileStatus = '';
  secondsCounter = interval(3000);

  targets = [];
  // @ts-ignore
  selectedTarget = new SelectedTarget();

  showSpinner: boolean = false;

  folderValue: '';
  oldFolderValue: '';
  mtaArchiveFolderName: string;
  @ViewChild('div') div: ElementRef;

  constructor(private renderer: Renderer2, private route: ActivatedRoute,
              private weblogicTomcatAnalysisService: WeblogicTomcatAnalysisService, private shared: SharedVariables) {
  }

  ngOnInit(): void {
    this.folderValue = '';
    this.oldFolderValue = '';
    this.shared.sharedMtaArchiveFolderName.subscribe(mtaArchiveFolderName => {
      this.mtaArchiveFolderName = mtaArchiveFolderName;
    });
    this.weblogicTomcatAnalysisService.getRules().subscribe(wtaRules => {
      this.targets = wtaRules;
    });
  }

  selectFile(event): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {

    this.currentFile = this.selectedFiles.item(0);
    this.weblogicTomcatAnalysisService.uploadArchiveForAnalysis(this.currentFile,
        this.selectedTarget.target).subscribe(uploadArchiveDto => {
          this.uploadArchiveDto = uploadArchiveDto;
          this.oldFolderValue = this.folderValue;
          this.folderValue = uploadArchiveDto.folderName;
          // @ts-ignore
          this.commandView = true;
          this.weblogicTomcatAnalysisService.getStreamOutput(this.folderValue).subscribe(data => {
            const p: HTMLParagraphElement = this.renderer.createElement('p');
            p.innerHTML = data;
            this.renderer.appendChild(this.div.nativeElement, p);
          });
          this.shared.setMtaArchiveFolderName(this.folderValue);
          this.message = 'File Uploaded successfully, please wait for the report to be processed....... ';
          this.iframeRender = false;
          this.showSpinner = true;

        }
        , error => {
          this.message = 'Could not upload the file!';
          this.currentFile = undefined;
          this.selectedFile = undefined;
          this.selectedFiles = undefined;
        });


    this.secondsCounter.subscribe(n => {

          if (this.oldFolderValue === this.folderValue) {
            console.log('folderName empty');
          } else {
            this.weblogicTomcatAnalysisService.checkIndexFileExists(this.folderValue).subscribe(wtcIndexFileDto => {
              this.wtcIndexFileDto = wtcIndexFileDto;
              this.fileStatus = this.wtcIndexFileDto.fileName;
              if (this.fileStatus === 'index.html exists') {
                this.iframeRender = true;
                this.showSpinner = false;
                this.oldFolderValue = this.folderValue;

              }
            });

          }

        }
    );
    this.iframeRender = false;
    this.commandView = false;

  }

}

