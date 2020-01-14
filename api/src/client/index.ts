import axios, { AxiosInstance } from 'axios';

import Auth from './services/auth';
import Referentiel from './services/referentiel';
import Offres from './services/offres';

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

  readonly referentiel = new Referentiel(this);

  readonly offres = new Offres(this);

  private token?: string;

  private tokenExpiration?: Date;

  constructor(params: ClientParams) {
    this.clientID = params.clientID;
    this.clientSecret = params.clientSecret;
    this.scopes = params.scopes;
    this.grantType = params.grantType ?? 'client_credentials';

    this.http = axios.create({
      baseURL: params.baseURL ?? 'https://api.emploi-store.fr/partenaire/offresdemploi',
      timeout: 1000,
    });

    this.http.interceptors.request.use(async (config) => {
      const token = await this.getToken();
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    this.auth = new Auth(this);
  }

  async getToken(): Promise<string> {
    if (!this.token || !this.tokenExpiration || new Date() > this.tokenExpiration) {
      const { access_token, expires_in } = await this.auth.connect();
      this.tokenExpiration = new Date(Date.now() + (expires_in - 2) * 1000);
      this.token = access_token;
    }

    return this.token;
  }
}

export default Client;
