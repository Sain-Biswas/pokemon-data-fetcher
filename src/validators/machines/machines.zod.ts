import { NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const MachineZodSchema = z.object({
	id: z.number().int().describe("The identifier for this resource."),
	item: NamedAPIResourceZodSchema.describe("The TM or HM item that corresponds to this machine."),
	move: NamedAPIResourceZodSchema.describe("The move that is taught by this machine."),
	version_group: NamedAPIResourceZodSchema.describe("The version group that this machine applies to.")
});

export { MachineZodSchema };
