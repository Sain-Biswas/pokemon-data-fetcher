import { describe, expect, it } from "bun:test";
import { NamedAPIResourceListZodSchema } from "~/validators/resource-lists/named-api-resource-list.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchPokemonResourceList = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/pokemon");

	if (!response.ok) {
		throw new Error("Named API Resource List - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Named API Resource List", () => {
	it("Should match the zod schema - NamedAPIResourceListZodSchema", async () => {
		const data = await fetchPokemonResourceList(),
			parsed = NamedAPIResourceListZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("NamedAPIResourceListZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
