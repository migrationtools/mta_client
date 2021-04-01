import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs';
import {MatSidenav} from '@angular/material';
import {ActivatedRoute, Router} from '@angular/router';
import {SessionManager} from '../../../shared/session-manager';
import {ArchCheckconfiguration} from '../../models/archcheckconfiguration';

const SMALL_WIDTH_BREAKPOINT = 720;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  private mediaMatcher: MediaQueryList =
    matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`);

  configurations: Observable<ArchCheckconfiguration[]>;
  isDarkTheme = false;
  configs: ArchCheckconfiguration[] = [];

  constructor(zone: NgZone,
              private router: Router, private sessionManager: SessionManager) {
    this.mediaMatcher.addListener(mql =>
      zone.run(() => this.mediaMatcher = matchMedia(`(max-width: ${SMALL_WIDTH_BREAKPOINT}px)`)));
  }



  @ViewChild(MatSidenav) sidenav: MatSidenav;

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
  }

  logout() {
    console.log('logoout');
    this.sessionManager.logout();
    this.router.navigate(['/login']);
  }

  ngOnInit() {
    this.configs.push(Object.assign({},
        new ArchCheckconfiguration('legacy_standard', 'Migration-Assessment',
            'questionaire', 'leaf', null)));

    this.configs.push(Object.assign({},
        new ArchCheckconfiguration('standard_cloud', 'Cloud Readiness Assessment',
            'questionaire', 'leaf', null)));


    this.router.events.subscribe(() => {
      if (this.isScreenSmall()) {
        this.sidenav.close();
      }
    });
  }


  isScreenSmall(): boolean {
    return this.mediaMatcher.matches;
  }

}
