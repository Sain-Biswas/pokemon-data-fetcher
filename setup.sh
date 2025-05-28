rm -rf migrations pokemon.db

# bun db:generate
# bun db:migrate

bun db:push

echo "Starting data fetching"

bun run src/01-group-fetcher.ts
echo "Group 1 done"

bun run src/02-group-fetcher.ts
echo "Group 2 done"

bun run src/03-group-fetcher.ts
echo "Group 3 done"

bun run src/04-group-fetcher.ts
echo "Group 4 done"

echo "Generation complete"