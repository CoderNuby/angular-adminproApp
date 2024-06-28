import { Component, OnDestroy } from '@angular/core';
import { Observable, Subscription, filter, interval, map, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.css'
})
export class RxjsComponent implements OnDestroy {

  couter: number = 0;
  couterInterval: number = 0;

  couterSubscription!: Subscription;
  internalSubscription!: Subscription;

  constructor(){
    this.couterSubscription = this.couterObservable().subscribe(x => {
      this.couter = x;
    });

    this.internalSubscription = this.intervalObservable().subscribe(x => this.couterInterval = x);
  }

  ngOnDestroy(): void {
    this.couterSubscription.unsubscribe();
    this.internalSubscription.unsubscribe();
  }

  intervalObservable() {
    return interval(1000).pipe(take(4), map(x => x + 1));
  }

  couterObservable() {
    return new Observable<number>(observer => {
      let counter = 0;
      const interval = setInterval(() => {
        observer.next(counter);
        counter++;

        if(counter > 10) {
        observer.complete();
          clearInterval(interval);
        }
      }, 1000);
    });
  }
}
