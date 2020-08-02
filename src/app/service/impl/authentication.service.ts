import {Injectable} from '@angular/core';
import {AbstractHttp} from '../abstract-http';
import {User} from '../../model/user';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends AbstractHttp<User, number> {
  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.currentUser = this.currentUserSubject.asObservable();
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
  }
}
