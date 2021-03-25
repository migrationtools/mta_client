import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from "@angular/router";
import {DimDataCenterModel} from '../../services/mockDataCenterEntity.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {


  constructor(private route: ActivatedRoute,
              private router: Router) {
    router.events.subscribe((routerEvent: Event)=> {
      this.checkRouterEvent(routerEvent);
    });

  }

  public dimDataCenter: Array<DimDataCenterModel> = new Array<DimDataCenterModel>();
  public selectedNavOption: string;
  loading = true;

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }


  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (!id) id = 1;
      this.selectedNavOption = id;
    });

  }



}
