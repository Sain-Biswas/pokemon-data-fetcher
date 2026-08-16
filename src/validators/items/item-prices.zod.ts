import { NamedAPIResourceZodSchema } from "~/validators/utility/common-models.zod";
import { z } from "zod";

const ItemPriceZodSchema = z.object({
	currency: NamedAPIResourceZodSchema.describe("The currency used for this price."),
	purchase_price: z
		.number()
		.int()
		.nullable()
		.describe("The purchase price of this item in this version group. Null if the item cannot be purchased."),
	sell_price: z
		.number()
		.int()
		.nullable()
		.describe("The sell price of this item in this version group. Null if the item cannot be sold."),
	version_group: NamedAPIResourceZodSchema.describe("The version group these prices apply to.")
});

export { ItemPriceZodSchema };
