import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorData } from '../../../core/models/http.models';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styles: [],
})
export class FormErrorsComponent implements OnInit {
  @Input() error!: HttpErrorData | null;
  @Input() isFormSubmitted!: boolean | null;
  @Input() isFormValid!: boolean | null;
  @Input() formErrorMessage = 'The form contains errors.';

  defaultError = 'An error occured. Try again.';

  constructor() {}

  ngOnInit(): void {}
}
