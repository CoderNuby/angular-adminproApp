import { Component, EventEmitter, Input, Output } from '@angular/core';

type ColorClass = "primary" | "secondary" | "info";

@Component({
  selector: 'app-increment-decrement',
  templateUrl: './increment-decrement.component.html',
  styleUrl: './increment-decrement.component.css'
})
export class IncrementDecrementComponent {

  @Output() progressChange: EventEmitter<number> = new EventEmitter();

  @Input() progress: number = 50;
  @Input() colorClass: ColorClass = "primary";

  changeProgressValue(value: number){
    if((this.progress + value) > 100) {
      this.progress = 100;
      this.progressChange.emit(this.progress);
      return;
    }

    if((this.progress + value) < 0) {
      this.progress = 0;
      this.progressChange.emit(this.progress);
      return;
    }
    this.progress = this.progress + value;
    this.progressChange.emit(this.progress);
  }

  onChangeProgress(event: KeyboardEvent) {
    if(this.progress > 100) {
      this.progress = 100;
      this.progressChange.emit(this.progress);
      return;
    }

    if(this.progress < 0) {
      this.progress = 0;
      this.progressChange.emit(this.progress);
      return;
    }

    this.progressChange.emit(this.progress);
  }
}
