export interface IAuthService {
  validateUser(username: string, password: string): Promise<any>;
  login(user: any): Promise<ILoginResponse>;
}

export interface ILoginResponse {
  access_token: string;
  token_type: string;
  expires_in: string;
}

export interface IUser {
  id: number;
  username: string;
  password: string;
}

export interface IValidateUserResponse {
  id: number;
  username: string;
}
