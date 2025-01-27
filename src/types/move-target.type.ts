export default interface MoveTargetType {
  descriptions: Description[];
  id: number;
  moves: Reference[];
  name: string;
  names: Name[];
}

interface Name {
  language: Reference;
  name: string;
}

interface Description {
  description: string;
  language: Reference;
}

interface Reference {
  name: string;
  url: string;
}
