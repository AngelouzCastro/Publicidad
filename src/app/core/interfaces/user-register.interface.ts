export interface UserRegister {
  email: string;
  password: string;
  name: string;
  picture?: string;
  facebookId?: string;
  facebookUserAccessTokenLongLived?: string;
}