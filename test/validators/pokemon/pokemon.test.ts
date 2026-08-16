import { describe, expect, it } from "bun:test";
import { PokemonZodSchema } from "~/validators/pokemon/pokemon.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchPokemonResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/pokemon/6");

	if (!response.ok) {
		throw new Error("Pokemon Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Pokemon Resource", () => {
	it("Should match the zod schema - PokemonZodSchema", async () => {
		const data = await fetchPokemonResource();

		const parsed = PokemonZodSchema.safeParse(data);

		if (!parsed.success) {
			// oxlint-disable-next-line unicorn/no-null
			console.error("PokemonZodSchema Parse Error:", JSON.stringify(z.treeifyError(parsed.error), null, 2));
		}

		expect(parsed.success).toBe(true);
	});
});
