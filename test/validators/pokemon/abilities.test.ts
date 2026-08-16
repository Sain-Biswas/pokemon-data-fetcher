import { describe, expect, it } from "bun:test";
import { AbilityZodSchema } from "~/validators/pokemon/abilities.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchAbilityResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/ability/1");

	if (!response.ok) {
		throw new Error("Ability Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Ability Resource", () => {
	it("Should match the zod schema - AbilityZodSchema", async () => {
		const data = await fetchAbilityResource();

		const parsed = AbilityZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("AbilityZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
