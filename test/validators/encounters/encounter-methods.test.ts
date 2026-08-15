import { describe, expect, it } from "bun:test";
import { EncounterMethodZodSchema } from "~/validators/encounters/encounter-methods.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchEncounterMethodsResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/encounter-method/1");

	if (!response.ok) {
		throw new Error("Encounter Methods Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Encounter Methods Resource", () => {
	it("Should match the zod schema - EncounterMethodZodSchema", async () => {
		const data = await fetchEncounterMethodsResource();

		const parsed = EncounterMethodZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("EncounterMethodZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
