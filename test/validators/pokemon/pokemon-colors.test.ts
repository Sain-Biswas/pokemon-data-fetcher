import { describe, expect, it } from "bun:test";
import { PokemonColorZodSchema } from "~/validators/pokemon/pokemon-colors.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchPokemonColorResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/pokemon-color/1");

	if (!response.ok) {
		throw new Error("Pokemon Color Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Pokemon Color Resource", () => {
	it("Should match the zod schema - PokemonColorZodSchema", async () => {
		const data = await fetchPokemonColorResource();

		const parsed = PokemonColorZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("PokemonColorZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
