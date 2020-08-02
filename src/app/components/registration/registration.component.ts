import {Component, Injectable, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../service/impl/user.service';
import {User} from '../../model/user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})

@Injectable()
export class RegistrationComponent implements OnInit {
  private readonly formGroup: FormGroup;

  constructor(private userService: UserService) {
    this.formGroup = new FormGroup({
      username: new FormControl('', {validators: [Validators.required, Validators.minLength(4)]}),
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(6)]}),
      firstName: new FormControl('', {validators: [Validators.required, Validators.maxLength(50)]}),
      lastName: new FormControl('', {validators: [Validators.required, Validators.maxLength(50)]}),
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

  private makeUser(formGroup: FormGroup): User {
    if (formGroup) {
      const user: User = {};
      Object.keys(formGroup.controls).forEach(field => {
        user[field] = formGroup.get(field).value;
      });
      return user;
    }
    return null;
  }

  public submit(): void {
    if (this.validateAllFormFields(this.formGroup)) {
      this.userService.create(this.makeUser(this.formGroup), (users) => {
        console.log(users);
      });
    }
  }

  public get form() {
    return this.formGroup;
  }

  public get username() {
    return this.formGroup.get('username');
  }

  public get email() {
    return this.formGroup.get('email');
  }

  public get password() {
    return this.formGroup.get('password');
  }

  public get firstName() {
    return this.formGroup.get('firstName');
  }

  public get lastName() {
    return this.formGroup.get('lastName');
  }

  public get phone() {
    return this.formGroup.get('phone');
  }
}
