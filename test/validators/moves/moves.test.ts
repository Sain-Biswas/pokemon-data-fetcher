import { describe, expect, it } from "bun:test";
import { MoveZodSchema } from "~/validators/moves/moves.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchMoveResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/move/1");

	if (!response.ok) {
		throw new Error("Move Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Move Resource", () => {
	it("Should match the zod schema - MoveZodSchema", async () => {
		const data = await fetchMoveResource();

		const parsed = MoveZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("MoveZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
