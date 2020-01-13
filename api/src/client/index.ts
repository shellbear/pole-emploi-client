import axios, { AxiosInstance } from 'axios';

import Auth from './services/auth';

export interface ClientParams {
  clientID: string;
  clientSecret: string;
  scopes: string[];
  grantType?: string;
  baseURL?: string;
}

export class Client {
  readonly clientID: string;

  readonly clientSecret: string;

  readonly scopes: string[];

  readonly grantType: string;

  readonly http: AxiosInstance;

  readonly auth = new Auth(this);

  constructor(params: ClientParams) {
    this.clientID = params.clientID;
    this.clientSecret = params.clientSecret;
    this.scopes = params.scopes;
    this.grantType = params.grantType ?? 'client_credentials';

    this.http = axios.create({
      baseURL: params.baseURL ?? 'https://entreprise.pole-emploi.fr/',
      timeout: 1000,
    });

    this.auth = new Auth(this);
  }
}

export default Client;
