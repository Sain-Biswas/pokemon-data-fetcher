import { describe, expect, it } from "bun:test";
import { MoveCategoryZodSchema } from "~/validators/moves/move-categories.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchMoveCategoryResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/move-category/1");

	if (!response.ok) {
		throw new Error("Move Category Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Move Category Resource", () => {
	it("Should match the zod schema - MoveCategoryZodSchema", async () => {
		const data = await fetchMoveCategoryResource();

		const parsed = MoveCategoryZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("MoveCategoryZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
