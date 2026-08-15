import { describe, expect, it } from "bun:test";
import { EncounterConditionZodSchema } from "~/validators/encounters/encounter-conditions.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchEncounterConditionsResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/encounter-condition/1");

	if (!response.ok) {
		throw new Error("Encounter Conditions Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Encounter Conditions Resource", () => {
	it("Should match the zod schema - EncounterConditionZodSchema", async () => {
		const data = await fetchEncounterConditionsResource();

		const parsed = EncounterConditionZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("EncounterConditionZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
