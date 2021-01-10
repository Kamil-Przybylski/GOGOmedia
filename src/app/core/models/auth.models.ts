export interface AuthUser {
  id: number;
  name: string;
  login: string;
}

// forms

export interface FormSignInModel {
  username: string;
  password: string;
}

// dto

export class AuthSignInReqDto {
  public username: string;
  public password: string;

  constructor(formSignInModel: FormSignInModel) {
    this.username = formSignInModel.username;
    this.password = formSignInModel.password;
  }
}

export interface AuthSignInRes {
  authUser: AuthUser;
  token: string;
}
export class AuthSignInResDto implements AuthSignInRes {
  public authUser: AuthUser;
  public token: string;

  constructor(response: AuthSignInRes) {
    this.authUser = response.authUser;
    this.token = response.token;
  }
}
