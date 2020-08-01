import {Component, Injectable, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

@Injectable()
export class RegistrationComponent implements OnInit {
  private formGroup: FormGroup;

  constructor(private httpClient: HttpClient) {
    this.formGroup = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(6)]}),
      phone: new FormControl('', {validators: [Validators.required, Validators.maxLength(20)]})
    });
  }

  ngOnInit(): void {
  }

  private validateAllFormFields(formGroup: FormGroup): boolean {
    let isValid = true;
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        if (control.invalid) {
          isValid = !control.invalid;
        }
        control.markAsTouched({onlySelf: true});
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
    return isValid;
  }

  public submit(): void {
    if (this.validateAllFormFields(this.formGroup)) {
      this.httpClient.post('http://localhost:8080/spplatform/api/users', {
        username: 'user',
        email: 'slava.777.bondarchuk@outlook.com',
        password: 'user',
        phone: '12345678'
      }, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      }).subscribe(text => console.log(text), error => console.error(error.message));
    }
  }

  public get form() {
    return this.formGroup;
  }
  public get email() {
    return this.formGroup.get('email');
  }
  public get password() {
    return this.formGroup.get('password');
  }
  public get phone() {
    return this.formGroup.get('phone');
  }
}
