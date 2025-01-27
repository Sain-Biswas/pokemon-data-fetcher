export default interface ContestEffectType {
  appeal: number;
  effect_entries: Effectentry[];
  flavor_text_entries: Flavortextentry[];
  id: number;
  jam: number;
}

interface Flavortextentry {
  flavor_text: string;
  language: Language;
}

interface Effectentry {
  effect: string;
  language: Language;
}

interface Language {
  name: string;
  url: string;
}
