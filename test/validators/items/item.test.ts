import { describe, expect, it } from "bun:test";
import { ItemZodSchema } from "~/validators/items/item.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchItemResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/item/1");

	if (!response.ok) {
		throw new Error("Item Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Item Resource", () => {
	it("Should match the zod schema - ItemZodSchema", async () => {
		const data = await fetchItemResource();

		const parsed = ItemZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("ItemZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
