import {Injectable} from '@angular/core';
import {AbstractHttp} from '../abstract-http';
import {User} from '../../model/user';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService extends AbstractHttp<User, number> {

  constructor(httpClient: HttpClient) {
    super(httpClient);
    this.url += 'api/users';
  }

}
