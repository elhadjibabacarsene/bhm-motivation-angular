import {AbstractControl, FormControl, ValidationErrors} from "@angular/forms";
import {isNumeric} from "rxjs/internal-compatibility";


export function validationNumField(control: FormControl): { [p: string]: boolean } | null{
    if(isNumeric(control.value)){
      return {'champsIsNumeric': true}
    }
    return null;
}
