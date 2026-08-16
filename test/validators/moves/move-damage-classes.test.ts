import { describe, expect, it } from "bun:test";
import { MoveDamageClassZodSchema } from "~/validators/moves/move-damage-classes.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchMoveDamageClassResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/move-damage-class/1");

	if (!response.ok) {
		throw new Error("Move Damage Class Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Move Damage Class Resource", () => {
	it("Should match the zod schema - MoveDamageClassZodSchema", async () => {
		const data = await fetchMoveDamageClassResource();

		const parsed = MoveDamageClassZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("MoveDamageClassZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
