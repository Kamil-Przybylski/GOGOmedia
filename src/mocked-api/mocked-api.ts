import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import {
  AuthSignInReqDto,
  AuthSignInRes,
} from '../app/core/models/auth.models';

interface MockUser {
  id: number;
  name: string;
  login: string;
  password: string;
}
interface MockStorage {
  [id: string]: MockUser;
}

class MockedApi {
  private storage: MockStorage = {
    user1: {
      id: 1,
      name: 'First User',
      login: 'user1',
      password: 'password',
    },
    user2: {
      id: 1,
      name: 'Second User',
      login: 'user2',
      password: 'password',
    },
  };

  private getUser(credentials: AuthSignInReqDto): Promise<MockUser> {
    const user = this.storage[credentials.username];

    // mock async
    return Promise.resolve(user);
  }

  private createAuthSignInRes(user: MockUser): AuthSignInRes {
    return {
      authUser: { id: user.id, login: user.login, name: user.name },
      token: `token.${user.login}.${user.password}`,
    };
  }

  private getResponse(
    credentials: AuthSignInReqDto,
    user: MockUser,
    errorMessage: string
  ) {
    if (user && credentials && user.password === credentials.password) {
      return this.createAuthSignInRes(user);
    } else {
      throw new HttpErrorResponse({
        error: { message: errorMessage },
        status: 401,
      });
    }
  }

  public async signIn(credentials: AuthSignInReqDto): Promise<AuthSignInRes> {
    const user = await this.getUser(credentials);

    const promise = new Promise((resolve, reject) => {
      // mock request delay 1s
      setTimeout(() => resolve(true), 1000);
    });

    return await promise.then(() =>
      this.getResponse(credentials, user, 'Invalid login or password!')
    );
  }

  public async login(token: string): Promise<AuthSignInRes> {
    const splitedToken = token?.split('.');
    const credentials: AuthSignInReqDto = {
      username: splitedToken?.[1],
      password: splitedToken?.[2],
    };
    const user = await this.getUser(credentials);

    const promise = new Promise((resolve, reject) => {
      // mock request delay 0.3s
      setTimeout(() => resolve(true), 300);
    });

    return await promise.then(() =>
      this.getResponse(
        credentials,
        user,
        'The session has expired. Please login again.'
      )
    );
  }
}

// mocked HttpClient to overwrite SingIn and Login Controller
@Injectable({
  providedIn: 'root',
})
export class MockedHttpClient extends HttpClient {
  private api = new MockedApi();

  public post<T>(url: string, body: any, options?: any): Observable<any> {
    if (url.includes('singin')) return from(this.api.signIn(body));
    else if (url.includes('login')) return from(this.api.login(body?.token));
    else return super.post(url, body, options);
  }
}
