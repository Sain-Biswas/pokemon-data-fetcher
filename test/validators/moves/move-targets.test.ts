import { describe, expect, it } from "bun:test";
import { MoveTargetZodSchema } from "~/validators/moves/move-targets.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchMoveTargetResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/move-target/1");

	if (!response.ok) {
		throw new Error("Move Target Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Move Target Resource", () => {
	it("Should match the zod schema - MoveTargetZodSchema", async () => {
		const data = await fetchMoveTargetResource();

		const parsed = MoveTargetZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("MoveTargetZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
