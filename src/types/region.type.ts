export default interface regionType {
  id: number;
  locations: Reference[];
  main_generation: Reference;
  name: string;
  names: Name[];
  pokedexes: Reference[];
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
