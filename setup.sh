rm -rf migrations pokemon.db

bun db:generate
bun db:migrate

bun run src/01-group-fetcher.ts
bun run src/02-group-fetcher.ts
bun run src/03-group-fetcher.ts
bun run src/04-group-fetcher.ts
