export default interface MoveAilmentType {
  id: number;
  moves: Move[];
  name: string;
  names: Name[];
}

interface Name {
  language: Move;
  name: string;
}

interface Move {
  name: string;
  url: string;
}
