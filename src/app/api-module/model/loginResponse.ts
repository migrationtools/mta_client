export class LoginResponse {

  public access_token: string;
  public expires_in: string;

  constructor(){
    this.access_token = 'mocktoken';
    this.expires_in = '60000';
  }

}
