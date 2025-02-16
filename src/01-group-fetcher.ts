import contestEffectGenerator from "./fetchers/01-contest-effect.fetcher";
import contestTypeGenerator from "./fetchers/01-contest-type.fetcher";
import eggGroupGenerator from "./fetchers/01-egg-group.fetcher";
import generationGenerator from "./fetchers/01-generation.fetcher";
import moveAilmentGenerator from "./fetchers/01-move-ailment.fetcher";
import moveDamageClassGenerator from "./fetchers/01-move-damage-class.fetcher";
import moveTargetGenerator from "./fetchers/01-move-target.fetcher";

generationGenerator();
moveAilmentGenerator();
moveTargetGenerator();
contestTypeGenerator();
contestEffectGenerator();
eggGroupGenerator();
moveDamageClassGenerator();
