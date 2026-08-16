import { describe, expect, it } from "bun:test";
import { CharacteristicZodSchema } from "~/validators/pokemon/characteristics.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchCharacteristicResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/characteristic/1");

	if (!response.ok) {
		throw new Error("Characteristic Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Characteristic Resource", () => {
	it("Should match the zod schema - CharacteristicZodSchema", async () => {
		const data = await fetchCharacteristicResource();

		const parsed = CharacteristicZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("CharacteristicZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
