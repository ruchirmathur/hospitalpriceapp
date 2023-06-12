import { Component, OnInit } from '@angular/core';
import { AuthOIDC } from '../../api/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  authClient: AuthOIDC;
  userDetails!: string;
  tokenDetails!: string;

  constructor() {
    this.authClient = new AuthOIDC(
      {
        environment_id: '1ca92fb8-86bf-492d-b55f-c45545517059',
        client_id: '6772740f-31e8-4717-a89a-ad974a29ace7',
        redirect_uri: 'https://gray-tree-0f6a0900f.3.azurestaticapps.net/dashboard',
        post_logout_redirect_uri: 'http://localhost:4200',
        api_uri: 'https://api.pingone.com',
        auth_uri: 'https://auth.pingone.com'
      }
    );
  }

  ngOnInit() {
    
    console.log("auth::"+this.authClient.isAuthenticated());
    this.authClient.init()
        .then(data => {
          this.userDetails = this.authClient.formatIntoTable(data);
          this.tokenDetails = this.authClient.showTokenClaimsInfo();
        })
        .catch(error => console.log(error));
  }

  signIn() {
    console.log("auth::2"+this.authClient.isAuthenticated());
    this.authClient.signIn({
      scope: 'openid profile',
      response_type: 'token id_token'
    });
  }

  signOff() {
    this.authClient.signOff();
  }
}
