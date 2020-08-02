import {Http} from './http';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.dev';

export abstract class AbstractHttp<T, I> implements Http<T, I> {
  protected url = environment.uri;
  protected headers = environment.headers;

  protected constructor(private httpClient: HttpClient) {
  }

  create(o: T, callback: any): void {
    this.httpClient.post(this.url, o, {headers: this.headers}).subscribe(data => {
      if (data) {
        callback(data);
      }
    });
  }

  delete(id: I, callback: any): void {
    this.httpClient.delete(this.url + `?id=${id}`, {headers: this.headers}).subscribe();
  }

  read(id: I, callback: any): void {
    this.httpClient.get(this.url + `?id=${id}`, {headers: this.headers});
  }

  readAll(callback: any): void {
    this.httpClient.get(this.url, {headers: this.headers}).subscribe(data => {
      if (data && data instanceof Array && data.length > 0) {
        const arr: Array<T> = new Array<T>();
        data.forEach((o) => {
          arr.push(o);
        });

        callback(arr);
      }
    });
  }

  update(id: I, o: T, callback: any): void {
    this.httpClient.patch(this.url + `?id=${id}`, o, {headers: this.headers});
  }

}
