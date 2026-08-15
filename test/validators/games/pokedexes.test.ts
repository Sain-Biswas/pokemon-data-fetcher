import { describe, expect, it } from "bun:test";
import { PokedexZodSchema } from "~/validators/games/pokedexes.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchPokedexResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/pokedex/1");

	if (!response.ok) {
		throw new Error("Pokedex Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Pokedex Resource", () => {
	it("Should match the zod schema - PokedexZodSchema", async () => {
		const data = await fetchPokedexResource();

		const parsed = PokedexZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("PokedexZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
