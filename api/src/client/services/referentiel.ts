import Service from './service';

export interface BaseResponse {
  code: string;
  libelle: string;
}

export interface AppellationsResponse extends BaseResponse {}
export interface ContinentsResponse extends BaseResponse {}
export interface DomainesResponse extends BaseResponse {}
export interface LanguesResponse extends BaseResponse {}
export interface MetiersResponse extends BaseResponse {}
export interface NaturesContratsResponse extends BaseResponse {}
export interface NiveauxFormationsResponse extends BaseResponse {}
export interface PaysResponse extends BaseResponse {}
export interface PermisResponse extends BaseResponse {}
export interface RegionsResponse extends BaseResponse {}
export interface SecteursActivitesResponse extends BaseResponse {}
export interface ThemesResponse extends BaseResponse {}
export interface TypesContratsResponse extends BaseResponse {}

export interface CommunesResponse extends BaseResponse {
  codePostal: string;
  codeDepartement: string;
}

export interface DepartementsResponse extends BaseResponse {
  region: BaseResponse;
}

class Referentiel extends Service {
  private async baseRequest<T>(resource: string, headers?: any): Promise<T[]> {
    return (await this.client.http.get(`/v2/referentiel/${resource}`)).data;
  }

  async appellations() {
    return this.baseRequest<AppellationsResponse>('appellations');
  }

  async communes() {
    return this.baseRequest<CommunesResponse>('communes');
  }

  async continents() {
    return this.baseRequest<ContinentsResponse>('continents');
  }

  async departements() {
    return this.baseRequest<DepartementsResponse>('departements');
  }

  async domaines() {
    return this.baseRequest<DomainesResponse>('domaines');
  }

  async langues() {
    return this.baseRequest<LanguesResponse>('langues');
  }

  async metiers() {
    return this.baseRequest<MetiersResponse>('metiers');
  }

  async naturesContrats() {
    return this.baseRequest<NaturesContratsResponse>('naturesContrats');
  }

  async niveauxFormations() {
    return this.baseRequest<NiveauxFormationsResponse>('niveauxFormations');
  }

  async pays() {
    return this.baseRequest<PaysResponse>('pays');
  }

  async permis() {
    return this.baseRequest<PermisResponse>('permis');
  }

  async regions() {
    return this.baseRequest<RegionsResponse>('regions');
  }

  async secteursActivites() {
    return this.baseRequest<SecteursActivitesResponse>('secteursActivites');
  }

  async themes() {
    return this.baseRequest<ThemesResponse>('themes');
  }

  async typesContrats() {
    return this.baseRequest<TypesContratsResponse>('typesContrats');
  }
}

export default Referentiel;
