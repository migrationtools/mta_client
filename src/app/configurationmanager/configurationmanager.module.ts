import { NgModule } from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import { ConfigurationmanagerAppComponent } from './configurationmanager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import {MaterialModule} from "../shared/material.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "./auth-guard";
import { QuestionaireParentComponent } from './components/questionaire/questionaire-parent/questionaire-parent.component';
import { QuestionaireFormComponent } from './components/questionaire/questionaire-form/questionaire-form.component';
import {MainContentComponent} from './components/main-content/main-content.component';
import { QuestionaireResultsComponent } from './components/questionaire/questionaire-results/questionaire-results.component';
import { WeblogicTomcatAnalysisParentComponent } from './components/weblogic-tomcat-analysis-parent/weblogic-tomcat-analysis-parent.component';
import { MtaArchiveAnalysisComponent } from './components/weblogic-tomcat-analysis-parent/mta-archive-analysis/mta-archive-analysis.component';
import { MtaAnalysisListComponent } from './components/weblogic-tomcat-analysis-parent/mta-analysis-list/mta-analysis-list.component';
import { MtaArchiveAnalysisReportComponent } from './components/weblogic-tomcat-analysis-parent/mta-archive-analysis/mta-archive-analysis-report/mta-archive-analysis-report.component';
import {ApiModule} from '../api-module/api.module';
import { MtaIframeLoaderComponent } from './components/weblogic-tomcat-analysis-parent/mta-iframe-loader/mta-iframe-loader.component';


const routes: Routes = [

  { path: '', component: ConfigurationmanagerAppComponent , canActivate: [AuthGuard],
    children: [
    {path: 'legacy_standard', component: WeblogicTomcatAnalysisParentComponent,
        children: [
          {path: 'weblogic-tomcat-analysis/mta-archive-analysis', component: MtaArchiveAnalysisComponent},
          {path: 'weblogic-tomcat-analysis/mta-analysis-list', component: MtaAnalysisListComponent}
          ]
    },
    {path: ':id', component: MainContentComponent},
    {path: '', component: MainContentComponent}
  ]},
  {path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [ConfigurationmanagerAppComponent, ToolbarComponent, SidenavComponent, QuestionaireParentComponent,
  QuestionaireFormComponent, MainContentComponent, QuestionaireResultsComponent, WeblogicTomcatAnalysisParentComponent,
    MtaArchiveAnalysisComponent, MtaAnalysisListComponent, MtaArchiveAnalysisReportComponent, MtaIframeLoaderComponent],
  imports: [
    CommonModule,
    ApiModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    DatePipe,
    AuthGuard,
    ApiModule
  ]
})
export class ConfigurationmanagerModule { }

