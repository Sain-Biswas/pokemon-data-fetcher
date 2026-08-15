import { describe, expect, it } from "bun:test";
import { ContestEffectZodSchema } from "~/validators/contests/contest-effects.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchContestEffectsResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/contest-effect/1");

	if (!response.ok) {
		throw new Error("Contest Effects Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Contest Effects Resource", () => {
	it("Should match the zod schema - ContestEffectZodSchema", async () => {
		const data = await fetchContestEffectsResource();

		const parsed = ContestEffectZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("ContestEffectZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
