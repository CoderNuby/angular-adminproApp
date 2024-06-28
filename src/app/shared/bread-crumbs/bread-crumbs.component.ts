import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-bread-crumbs',
  templateUrl: './bread-crumbs.component.html',
  styles: ``
})
export class BreadCrumbsComponent implements OnDestroy {

  title: string = "";

  titleSubscription!: Subscription;

  constructor(private router: Router) {
    this.titleSubscription = this.router.events.pipe(
      filter((x: any) => (x instanceof ActivationEnd)),
      filter((x: ActivationEnd) => x.snapshot.firstChild === null),
      map((x: ActivationEnd) => x.snapshot.data)
    ).subscribe((event: any)=> {
      this.title = event.title;
    });
  }

  ngOnDestroy(): void {
    this.titleSubscription.unsubscribe();
  }
}
