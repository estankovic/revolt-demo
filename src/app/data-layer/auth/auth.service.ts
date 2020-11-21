import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable()
export class AuthService {

  static TOKEN_KEY = 'refresh_token';

  constructor(
    private readonly http: HttpClient
  ) { }


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
    }>(`https://dev.revolt.city/api/refresh`, {refresh_token: refreshToken});
  }

  async getRefreshToken() {
    const {value} = await Storage.get({key: AuthService.TOKEN_KEY});
    return value;
  }

  async removeRefreshToken() {
    await Storage.remove({
      key: AuthService.TOKEN_KEY
    });
  }

  async rememberToken(refreshToken: string) {
    await Storage.set({
      key: AuthService.TOKEN_KEY,
      value: refreshToken
    });
  }
}
