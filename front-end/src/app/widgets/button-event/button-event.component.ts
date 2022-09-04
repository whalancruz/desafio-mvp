import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { IButtonEvent } from './button-event.interfaces';

@Component({
  selector: 'app-button-event',
  templateUrl: './button-event.component.html',
  styleUrls: ['./button-event.component.scss']
})
export class ButtonEventComponent implements OnInit {

  isLoading: boolean = false;

  @Input() options: IButtonEvent;

  @Input() form: FormControl | AbstractControl  = new FormControl(null);

  constructor() { }

  ngOnInit(): void {
    this.options.inicializeLoading = () => {
     this.isLoading = true;
    };
    this.options.closeLoading = () => {
      this.isLoading = false;
     };
  };

  public onClickButton() {
    this.options.response(true);
  };

}
