export default interface EggGroupType {
  id: number;
  name: string;
  names: Name[];
  pokemon_species: Language[];
}

interface Name {
  language: Language;
  name: string;
}

interface Language {
  name: string;
  url: string;
}
