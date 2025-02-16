import abilityGenerator from "./fetchers/02-ability.fetcher";
import pokemonSpeciesGenerator from "./fetchers/02-pokemon-species.fetcher";
import regionGenerator from "./fetchers/02-region.fetcher";
import typeGenerator from "./fetchers/02-type.fetcher";
import versionGroupGenerator from "./fetchers/02-version-group.fetcher";

pokemonSpeciesGenerator();
abilityGenerator();
versionGroupGenerator();
regionGenerator();
typeGenerator();
