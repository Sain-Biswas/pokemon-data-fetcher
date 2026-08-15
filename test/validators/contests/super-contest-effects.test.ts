import { describe, expect, it } from "bun:test";
import { SuperContestEffectZodSchema } from "~/validators/contests/super-contest-effects.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchSuperContestEffectsResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/super-contest-effect/1");

	if (!response.ok) {
		throw new Error("Super Contest Effects Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Super Contest Effects Resource", () => {
	it("Should match the zod schema - SuperContestEffectZodSchema", async () => {
		const data = await fetchSuperContestEffectsResource();

		const parsed = SuperContestEffectZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("SuperContestEffectZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
