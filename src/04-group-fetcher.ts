import movesOnEffectChangeGenerator from "./fetchers/04-moves-on-effect-change.fetcher";
import movesOnFlavorTextGenerator from "./fetchers/04-moves-on-flavor-text.fetcher";
import movesOnPokemonGenerator from "./fetchers/04-moves-on-pokemon.fetcher";
import pokemonOnAbilityGenerator from "./fetchers/04-pokemon-on-ability.fetcher";
import pokemonSpeciesOnFlavorTextGenerator from "./fetchers/04-pokemon-species-on-flavor-text.fetcher";
import pokemonSpeciesOnVarietyGenerator from "./fetchers/04-pokemon-species-on-variety.fetcher";
import typeOnPokemonGenerator from "./fetchers/04-type-on-pokemon.fetcher";

pokemonOnAbilityGenerator();
pokemonSpeciesOnVarietyGenerator();
pokemonSpeciesOnFlavorTextGenerator();
typeOnPokemonGenerator();
movesOnFlavorTextGenerator();
movesOnEffectChangeGenerator();
movesOnPokemonGenerator();
