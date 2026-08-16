import { describe, expect, it } from "bun:test";
import { TypeZodSchema } from "~/validators/pokemon/types.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchTypeResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/type/1");

	if (!response.ok) {
		throw new Error("Type Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Type Resource", () => {
	it("Should match the zod schema - TypeZodSchema", async () => {
		const data = await fetchTypeResource();

		const parsed = TypeZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("TypeZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
