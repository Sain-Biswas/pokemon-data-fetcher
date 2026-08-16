import { describe, expect, it } from "bun:test";
import { EggGroupZodSchema } from "~/validators/pokemon/egg-groups.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchEggGroupResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/egg-group/1");

	if (!response.ok) {
		throw new Error("Egg Group Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Egg Group Resource", () => {
	it("Should match the zod schema - EggGroupZodSchema", async () => {
		const data = await fetchEggGroupResource();

		const parsed = EggGroupZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("EggGroupZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
