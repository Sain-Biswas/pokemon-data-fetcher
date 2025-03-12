import { sql } from 'drizzle-orm';
import { sqliteView } from 'drizzle-orm/sqlite-core';
import { integer, text } from 'drizzle-orm/sqlite-core';

// Define the TypeScript type for the view results
export type PokemonDataViewType = {
  id: string;
  index: number;
  name: string;
  baseExperience: number | null;
  image: string | null;
  imageShiny: string | null;
  height: number | null;
  weight: number | null;
  hp: number | null;
  attack: number | null;
  defense: number | null;
  specialAttack: number | null;
  specialDefense: number | null;
  speed: number | null;
  cries: string | null;
  types: string; // This will be a comma-separated string that can be split into an array
  speciesId: string | null;
  speciesName: string | null;
  genera: string | null;
  isLegendary: boolean | null;
  isMythical: boolean | null;
  hasGenderDifferences: boolean | null;
  color: string | null;
  shape: string | null;
  habitat: string | null;
  baseHappiness: number | null;
  captureRate: number | null;
  regionName: string | null;
  generationId: string | null;
  generationName: string | null;
  isDefault: boolean | null;
  canGigantamax: boolean;
};

export const pokemonDataView = sqliteView('POKEMON_DATA_VIEW', {
  id: text('ID').notNull(),
  index: integer('INDEX').notNull(),
  name: text('NAME'),
  baseExperience: integer('BASE_EXPERIENCE'),
  image: text('IMAGE_NORMAL'),
  imageShiny: text('IMAGE_SHINY'),
  height: integer('HEIGHT'),
  weight: integer('WEIGHT'),
  hp: integer('HP'),
  attack: integer('ATTACK'),
  defense: integer('DEFENCE'),
  specialAttack: integer('SPECIAL_ATTACK'),
  specialDefense: integer('SPECIAL_DEFENCE'),
  speed: integer('SPEED'),
  cries: text('CRIES'),
  types: text('TYPES'),
  speciesId: text('SPECIES_ID'),
  speciesName: text('SPECIES_NAME'),
  genera: text('GENERA'),
  isLegendary: integer('IS_LEGENDARY', { mode: 'boolean' }),
  isMythical: integer('IS_MYTHICAL', { mode: 'boolean' }),
  hasGenderDifferences: integer('HAS_GENDER_DIFFERENCES', { mode: 'boolean' }),
  color: text('COLOR'),
  shape: text('SHAPE'),
  habitat: text('HABITAT'),
  baseHappiness: integer('BASE_HAPPINESS'),
  captureRate: integer('CAPTURE_RATE'),
  regionName: text('REGION_NAME'),
  generationId: text('GENERATION_ID'),
  generationName: text('GENERATION_NAME'),
  isDefault: integer('IS_DEFAULT', { mode: 'boolean' }),
  canGigantamax: integer('CAN_GIGANTAMAX', { mode: 'boolean' }),
}).as(sql`
  SELECT 
    p.ID as ID,
    p.INDEX as INDEX,
    p.NAME as NAME,
    p.BASE_EXPERIENCE as BASE_EXPERIENCE,
    p.IMAGE_NORMAL as IMAGE_NORMAL,
    p.IMAGE_SHINY as IMAGE_SHINY,
    p.HEIGHT as HEIGHT,
    p.WEIGHT as WEIGHT,
    p.HP as HP,
    p.ATTACK as ATTACK,
    p.DEFENCE as DEFENCE,
    p.SPECIAL_ATTACK as SPECIAL_ATTACK,
    p.SPECIAL_DEFENCE as SPECIAL_DEFENCE,
    p.SPEED as SPEED,
    p.CRIES as CRIES,
    GROUP_CONCAT(DISTINCT t.NAME) as TYPES,
    ps.ID as SPECIES_ID,
    ps.NAME as SPECIES_NAME,
    ps.GENERA as GENERA,
    ps.LEGENDARY as IS_LEGENDARY,
    ps.MYTHICAL as IS_MYTHICAL,
    ps.GENDER_DIFFERENCE as HAS_GENDER_DIFFERENCES,
    ps.COLOR as COLOR,
    ps.SHAPE as SHAPE,
    ps.HABITAT as HABITAT,
    ps.BASE_HAPPINESS as BASE_HAPPINESS,
    ps.CAPTURE_RATE as CAPTURE_RATE,
    r.NAME as REGION_NAME,
    g.ID as GENERATION_ID,
    g.NAME as GENERATION_NAME,
    psv.IS_DEFAULT as IS_DEFAULT,
    CASE WHEN p.NAME LIKE '%-gmax' THEN 1 ELSE 0 END as CAN_GIGANTAMAX
  FROM POKEMON p
  LEFT JOIN POKEMON_SPECIES ps ON p.SPECIES_REFERENCE = ps.ID
  LEFT JOIN GENERATION g ON ps.GENERATION_REFERENCE = g.ID
  LEFT JOIN REGION r ON g.MAIN_REGION_REFERENCE = r.ID
  LEFT JOIN TYPE_ON_POKEMON top ON p.ID = top.POKEMON_REFERENCE
  LEFT JOIN TYPE t ON top.TYPE_REFERENCE = t.ID
  LEFT JOIN POKEMON_SPECIES_ON_VARIETY psv ON p.ID = psv.POKEMON_REFERENCE AND ps.ID = psv.POKEMON_SPECIES_REFERENCE
  GROUP BY p.ID
`);

// Helper function to process the types field into an array
export function getTypesArray(pokemonData: PokemonDataViewType): string[] {
  return pokemonData.types?.split(',') || [];
}

// Export the view for use in the app
export default pokemonDataView;
