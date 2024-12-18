export interface Planets {
  name: string;
  uid: number;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: Array<string>;
  films: Array<string>;
  created: string;
  edited: string;
  url: string;
}

export interface PlanetRes {
  count: number;
  next?: string;
  previous?: string;
  results: Planets[];
}
