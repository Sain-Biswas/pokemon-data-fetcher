export default interface EvolutionChainType {
  baby_trigger_item: null;
  chain: EvolvesTo;
  id: number;
}

export interface EvolvesTo {
  evolution_details: Evolutiondetail[];
  evolves_to: EvolvesTo[];
  is_baby: boolean;
  species: Reference;
}

interface Evolutiondetail {
  held_item: Reference | null;
  item: Reference | null;
  known_move: Reference | null;
  known_move_type: Reference | null;
  min_level: null | number;
  needs_overworld_rain: boolean;
  party_species: Reference | null;
  party_type: Reference | null;
  time_of_day: string;
  trade_species: Reference | null;
  trigger: Reference;
  turn_upside_down: boolean;
}

interface Reference {
  name: string;
  url: string;
}

