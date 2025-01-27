export default interface GenerationType {
  abilities: Reference[];
  id: number;
  main_region: Reference;
  moves: Reference[];
  name: string;
  names: Name[];
  pokemon_species: Reference[];
  types: Reference[];
  version_groups: Reference[];
}

interface Name {
  language: Reference;
  name: string;
}

interface Reference {
  name: string;
  url: string;
}
