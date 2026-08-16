import { describe, expect, it } from "bun:test";
import { GenderZodSchema } from "~/validators/pokemon/genders.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchGenderResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/gender/1");

	if (!response.ok) {
		throw new Error("Gender Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Gender Resource", () => {
	it("Should match the zod schema - GenderZodSchema", async () => {
		const data = await fetchGenderResource();

		const parsed = GenderZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("GenderZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
