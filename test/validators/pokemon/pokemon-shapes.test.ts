import { describe, expect, it } from "bun:test";
import { PokemonShapeZodSchema } from "~/validators/pokemon/pokemon-shapes.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchPokemonShapeResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/pokemon-shape/1");

	if (!response.ok) {
		throw new Error("Pokemon Shape Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Pokemon Shape Resource", () => {
	it("Should match the zod schema - PokemonShapeZodSchema", async () => {
		const data = await fetchPokemonShapeResource();

		const parsed = PokemonShapeZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("PokemonShapeZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
