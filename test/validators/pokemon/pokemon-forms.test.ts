import { describe, expect, it } from "bun:test";
import { PokemonFormZodSchema } from "~/validators/pokemon/pokemon-forms.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchPokemonFormResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/pokemon-form/1");

	if (!response.ok) {
		throw new Error("Pokemon Form Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Pokemon Form Resource", () => {
	it("Should match the zod schema - PokemonFormZodSchema", async () => {
		const data = await fetchPokemonFormResource();

		const parsed = PokemonFormZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("PokemonFormZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
