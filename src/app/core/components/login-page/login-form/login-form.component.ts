import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { FormSignInModel } from '../../../models/auth.models';
import { HttpErrorData } from '../../../models/http.models';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styles: [],
})
export class LoginFormComponent implements OnInit {
  @ViewChild('formRef') formRef!: NgForm;
  @Input() isLoading!: boolean | null;
  @Input() httpError!: HttpErrorData | null;
  @Output() sumbit = new EventEmitter<FormSignInModel>();

  form!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.fb.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  submitForm(): void {
    this.formRef.onSubmit(new Event('submit'));
  }

  onLogin(): void {
    if (this.form.valid) {
      const formValue: FormSignInModel = this.form.value;
      formValue.username = formValue?.username?.trim();
      this.sumbit.emit(formValue);
    }
  }
}
