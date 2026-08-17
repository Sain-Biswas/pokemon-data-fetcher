import { populateDatabaseBerries } from "./functions/berries/berries.fx";
import { populateDatabaseBerryFirmnesses } from "./functions/berries/berry-firmnesses.fx";
import { populateDatabaseBerryFlavors } from "./functions/berries/berry-flavors.fx";

await Promise.all([populateDatabaseBerries(), populateDatabaseBerryFirmnesses(), populateDatabaseBerryFlavors()]);
