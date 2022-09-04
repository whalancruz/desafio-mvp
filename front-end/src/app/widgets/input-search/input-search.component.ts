import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.scss']
})
export class InputSearchComponent implements OnInit {

  @Input() control: FormControl = new FormControl(null);
  @Output() response: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  public eventKeyUp() {
    let timer, timeoutVal = 300;

    window.clearTimeout(timer);

    timer = window.setTimeout(() => {
      this.response.emit(this.control.value);
    }, timeoutVal);

  };

}
