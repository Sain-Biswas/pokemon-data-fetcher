import abilityOnEffectEntryGenerator from "./fetchers/03-ability-on-effect-entry.fetcher";
import abilityOnFlavorTextGenerator from "./fetchers/03-ability-on-flavor-text-fetcher";
import evolutionDetailsGenerator from "./fetchers/03-evolution-details.fetcher";
import moveGenerator from "./fetchers/03-moves.fetcher";
import pokemonSpeciesOnEggGroupGenerator from "./fetchers/03-pokemon-species-on-egg-group.fetcher";
import pokemonGenerator from "./fetchers/03-pokemon.fetcher";
import regionOnVersionGroupGenerator from "./fetchers/03-region-on-version-group.fetcher";
import versionGenerator from "./fetchers/03-version.fetcher";

versionGenerator();
regionOnVersionGroupGenerator();
moveGenerator();
pokemonGenerator();
evolutionDetailsGenerator();
pokemonSpeciesOnEggGroupGenerator();
abilityOnEffectEntryGenerator();
abilityOnFlavorTextGenerator();
