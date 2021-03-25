import {Injectable, NgZone} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SessionManager} from '../../shared/session-manager';
import {SharedVariables} from '../../shared/shared-variables';
import {Observable} from 'rxjs';
import {UploadArchiveAnalysisDto} from '../model/uploadArchiveAnalysisDto';

@Injectable()
export class WeblogicTomcatAnalysisService {
    folderName: any;

    constructor(private zone: NgZone, protected httpClient: HttpClient, private sessionManager: SessionManager) {
    }

    public uploadArchiveForAnalysis(file: File, target: string, reportProgress: boolean = false): Observable<any> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        formData.append('target', target);

        return this.httpClient.post<UploadArchiveAnalysisDto>(this.sessionManager.getBasePath() + '/uploadFile', formData,
            {reportProgress: true});
    }

    public getStreamOutput(fileName: any): Observable<any> {
        return new Observable<any>( obs => {
            const es = new EventSource(this.sessionManager.getBasePath() + '/consoleStreaming?logFile=' + fileName);
            es.onmessage = evt => {
                const data = evt.data;
                this.zone.run(() => obs.next(data));
            };
            es.onerror = error => {
                this.zone.run( () => {
                    obs.error(error);
                });
            };
            return () => {
                es.close();
            };
        });
    }

    public checkIndexFileExists(folderName: any, reportProgress: boolean = false): Observable<any> {
        return this.httpClient.get<any>(this.sessionManager.getBasePath() + '/findIndexFile?folderName=' + folderName,
            {
                reportProgress: true
            });
    }

    public getRules(reportProgress: boolean = false): Observable<any> {
        return this.httpClient.get<any>( this.sessionManager.getBasePath() + '/getRules',
            {
                reportProgress: true
            });
    }
}
