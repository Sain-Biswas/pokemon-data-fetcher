import { describe, expect, it } from "bun:test";
import { EncounterConditionValueZodSchema } from "~/validators/encounters/encounter-condition-values.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchEncounterConditionValuesResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/encounter-condition-value/1");

	if (!response.ok) {
		throw new Error("Encounter Condition Values Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Encounter Condition Values Resource", () => {
	it("Should match the zod schema - EncounterConditionValueZodSchema", async () => {
		const data = await fetchEncounterConditionValuesResource();

		const parsed = EncounterConditionValueZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("EncounterConditionValueZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
