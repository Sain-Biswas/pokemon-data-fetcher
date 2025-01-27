export default interface VersionGroupType {
  generation: Reference;
  id: number;
  move_learn_methods: any[];
  name: string;
  order: number;
  pokedexes: Reference[];
  regions: Reference[];
  versions: Reference[];
}

interface Reference {
  name: string;
  url: string;
}
