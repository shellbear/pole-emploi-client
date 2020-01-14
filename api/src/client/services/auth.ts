import axios from 'axios';
import { stringify } from 'querystring';

import Service from './service';

export interface ConnectResponse {
  scope: string;
  expires_in: number;
  token_type: string;
  access_token: string;
}

class Auth extends Service {
  async connect(realm = '/partenaire'): Promise<ConnectResponse> {
    const data = {
      grant_type: this.client.grantType,
      client_id: this.client.clientID,
      client_secret: this.client.clientSecret,
      scope: this.client.scopes.join(' '),
    };

    const resp = await axios.post(`https://entreprise.pole-emploi.fr/connexion/oauth2/access_token?realm=${realm}`, stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return resp.data;
  }
}

export default Auth;
