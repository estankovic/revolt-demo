import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class AuthService {
  constructor(
    private readonly http: HttpClient
  ) {
  }


  login(credentials: { login: string; password: string; }) {
    return this.http.post<{
      access_token: string;
      refresh_token: string;
    }>(`https://dev.revolt.city/api/login`, credentials);
  }

  refreshToken(refreshToken: string) {
    return this.http.post<{
      access_token: string;
      refresh_token: string;
    }>(`https://dev.revolt.city/api/login`, {refresh_token: refreshToken});
  }

}
