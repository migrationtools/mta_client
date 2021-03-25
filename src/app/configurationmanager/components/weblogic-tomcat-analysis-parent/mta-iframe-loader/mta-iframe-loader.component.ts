import {Component, Input, OnInit, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-mta-iframe-loader',
  templateUrl: './mta-iframe-loader.component.html',
  styleUrls: ['./mta-iframe-loader.component.scss']
})
export class MtaIframeLoaderComponent implements OnInit {
  urlSafe: SafeResourceUrl;
  @Input() sourceUrl: any;


  constructor(public sanitizer: DomSanitizer) {
  }

  ngOnInit() {

    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.sourceUrl);
  }
}
