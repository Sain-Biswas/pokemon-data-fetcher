export default interface TypesType {
  damage_relations: Damagerelations;
  game_indices: Gameindex[];
  generation: Doubledamagefrom;
  id: number;
  move_damage_class: Doubledamagefrom;
  moves: Doubledamagefrom[];
  name: string;
  names: Name[];
  past_damage_relations: Pastdamagerelation[];
  pokemon: Pokemon[];
}

interface Pokemon {
  pokemon: Doubledamagefrom;
  slot: number;
}

interface Pastdamagerelation {
  damage_relations: Damagerelations;
  generation: Doubledamagefrom;
}

interface Name {
  language: Doubledamagefrom;
  name: string;
}

interface Gameindex {
  game_index: number;
  generation: Doubledamagefrom;
}

interface Damagerelations {
  double_damage_from: Doubledamagefrom[];
  double_damage_to: Doubledamagefrom[];
  half_damage_from: Doubledamagefrom[];
  half_damage_to: Doubledamagefrom[];
  no_damage_from: Doubledamagefrom[];
  no_damage_to: Doubledamagefrom[];
}

interface Doubledamagefrom {
  name: string;
  url: string;
}
