export default interface MoveDamageClassType {
  descriptions: Description[];
  id: number;
  moves: Language[];
  name: string;
  names: Name[];
}

interface Name {
  language: Language;
  name: string;
}

interface Description {
  description: string;
  language: Language;
}

interface Language {
  name: string;
  url: string;
}
