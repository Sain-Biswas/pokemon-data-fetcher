import { describe, expect, it } from "bun:test";
import { MoveAilmentZodSchema } from "~/validators/moves/move-ailments.zod";
import { fetch } from "bun";
import { z } from "zod";

const fetchMoveAilmentResource = async (): Promise<unknown> => {
	const response = await fetch("https://pokeapi.co/api/v2/move-ailment/1");

	if (!response.ok) {
		throw new Error("Move Ailment Resource - NETWORK CONNECTION FAILED");
	}

	return (await response.json()) as unknown;
};

describe("Move Ailment Resource", () => {
	it("Should match the zod schema - MoveAilmentZodSchema", async () => {
		const data = await fetchMoveAilmentResource();

		const parsed = MoveAilmentZodSchema.safeParse(data);

		if (!parsed.success) {
			console.error("MoveAilmentZodSchema Parse Error:", z.treeifyError(parsed.error));
		}

		expect(parsed.success).toBe(true);
	});
});
