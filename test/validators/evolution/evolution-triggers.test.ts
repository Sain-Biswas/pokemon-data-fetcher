import { describe, expect, it } from "bun:test";
import { EvolutionTriggerZodSchema } from "~/validators/evolution/evolution-triggers.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchEvolutionTriggerResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/evolution-trigger/1");

	if (!response.ok) {
		throw new Error("Evolution Trigger Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Evolution Trigger Resource", () => {
	it("Should match the zod schema - EvolutionTriggerZodSchema", async () => {
		const data = await fetchEvolutionTriggerResource();

		const parsed = EvolutionTriggerZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("EvolutionTriggerZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
