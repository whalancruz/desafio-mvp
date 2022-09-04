import { AbstractControl, ValidatorFn } from "@angular/forms";

export class ValidacaoForms {

  constructor() { }

  public static validar(reg: RegExp): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      var value = (control.value) ? control.value?.toString() : null;
      if (value)
        return value.match(reg) ? null : { 'pattern': { value } };
      else
        return null;
    }
  }

}
