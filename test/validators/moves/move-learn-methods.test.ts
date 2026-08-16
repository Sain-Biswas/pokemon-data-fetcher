import { describe, expect, it } from "bun:test";
import { MoveLearnMethodZodSchema } from "~/validators/moves/move-learn-methods.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchMoveLearnMethodResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/move-learn-method/1");

	if (!response.ok) {
		throw new Error("Move Learn Method Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Move Learn Method Resource", () => {
	it("Should match the zod schema - MoveLearnMethodZodSchema", async () => {
		const data = await fetchMoveLearnMethodResource();

		const parsed = MoveLearnMethodZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("MoveLearnMethodZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
