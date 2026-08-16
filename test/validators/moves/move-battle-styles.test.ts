import { describe, expect, it } from "bun:test";
import { MoveBattleStyleZodSchema } from "~/validators/moves/move-battle-styles.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchMoveBattleStyleResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/move-battle-style/1");

	if (!response.ok) {
		throw new Error("Move Battle Style Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Move Battle Style Resource", () => {
	it("Should match the zod schema - MoveBattleStyleZodSchema", async () => {
		const data = await fetchMoveBattleStyleResource();

		const parsed = MoveBattleStyleZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("MoveBattleStyleZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
