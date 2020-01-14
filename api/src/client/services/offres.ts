import {ParsedUrlQueryInput, stringify} from 'querystring';

import Service from './service';

export interface LieuTravail {
  libelle: string;
  latitude: number;
  longitude: number;
  codePostal: string;
  commune: string;
}

export interface Entreprise {
  nom: string;
  description: string;
  logo: string;
  url: string;
  siret: string;
}

export interface Formation {
  codeFormation: string;
  domaineLibelle: string;
  niveauLibelle: string;
  commentaire: string;
  exigence: string;
}

export interface Langue {
  libelle: string;
  exigence: string;
}

export interface Permi {
  libelle: string;
  exigence: string;
}

export interface Competence {
  code: string;
  libelle: string;
  exigence: string;
}

export interface Salaire {
  libelle: string;
  commentaire: string;
  complement1: string;
  complement2: string;
}

export interface Contact {
  nom: string;
  coordonnees1: string;
  coordonnees2: string;
  coordonnees3: string;
  telephone: string;
  courriel: string;
  commentaire: string;
  urlRecruteur: string;
  urlPostulation: string;
}

export interface Agence {
  telephone: string;
  courriel: string;
}

export interface QualitesProfessionnelle {
  libelle: string;
  description: string;
}

export interface Partenaire {
  nom: string;
  url: string;
  logo: string;
}

export interface OrigineOffre {
  origine: string;
  urlOrigine: string;
  partenaires: Partenaire[];
}

export interface OffreResponse {
  id: string;
  intitule: string;
  description: string;
  dateCreation: Date;
  dateActualisation: Date;
  lieuTravail: LieuTravail;
  romeCode: string;
  romeLibelle: string;
  appellationlibelle: string;
  entreprise: Entreprise;
  typeContrat: string;
  typeContratLibelle: string;
  natureContrat: string;
  experienceExige: string;
  experienceLibelle: string;
  experienceCommentaire: string;
  formations: Formation[];
  langues: Langue[];
  permis: Permi[];
  outilsBureautiques: string[];
  competences: Competence[];
  salaire: Salaire;
  dureeTravailLibelle: string;
  dureeTravailLibelleConverti: string;
  complementExercice: string;
  conditionExercice: string;
  alternance: boolean;
  contact: Contact;
  agence: Agence;
  nombrePostes: number;
  accessibleTH: boolean;
  deplacementCode: string;
  deplacementLibelle: string;
  qualificationCode: string;
  qualificationLibelle: string;
  secteurActivite: string;
  secteurActiviteLibelle: string;
  qualitesProfessionnelles: QualitesProfessionnelle[];
  trancheEffectifEtab: string;
  origineOffre: OrigineOffre;
}

export interface Agregation {
  nbResultats: number;
  valeurPossible: string;
}

export interface Filtres {
  agregation: Agregation[];
  filtre: string;
}

export interface SearchOffreResponse {
  filtresPossibles: Filtres[];
  resultats: OffreResponse[];
}

export enum SortOffre {
  PERTINENCE,
  DATE,
  DISTANCE
}

export interface Range {
  start: number;
  end: number;
}

export interface SearchParams {
  range: Range|string;
  sort: SortOffre;
  domaine: string;
  codeROME: string;
  appellation: string;
  theme: string;
  secteurActivite: string;
  experience: string;
  typeContrat: string;
  natureContrat: string;
  qualification: string;
  tempsPlein: boolean;
  commune: string;
  distance: number;
  departement: string;
  inclureLimitrophes: boolean;
  region: string;
  paysContinent: string;
  niveauFormation: string;
  permis: string;
  motsCles: string;
  salaireMin: number;
  periodeSalaire: string;
  accesTravailleurHandicape: boolean;
  publieeDepuis: number;
  minCreationDate: Date|string;
  maxCreationDate: Date|string;
  offresMRS: boolean;
  experienceExigence: string;
}

class Offres extends Service {
  async search(params: Partial<SearchParams>): Promise<SearchOffreResponse> {
    if (params.minCreationDate && params.minCreationDate instanceof Date) {
      params.minCreationDate = params.minCreationDate.toISOString();
    }
    if (params.maxCreationDate && params.maxCreationDate instanceof Date) {
      params.maxCreationDate = params.maxCreationDate.toISOString();
    }
    if (params.range && typeof params.range !== 'string') {
      params.range = `${params.range.start}-${params.range.end}`;
    }

    return (await this.client.http.get(`/v2/offres/search?${stringify(params as ParsedUrlQueryInput)}`)).data;
  }

  async get(id: string): Promise<OffreResponse> {
    return (await this.client.http.get(`/v2/offres/${id}`)).data;
  }
}

export default Offres;
