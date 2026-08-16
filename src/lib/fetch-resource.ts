import { ZodError, treeifyError } from "zod";
// oxlint-disable-next-line no-duplicate-imports
import type { ZodType, z } from "zod";
import { fetch } from "bun";

interface FetchResourceProps<TZ extends ZodType> {
	readonly endpoint: string;
	readonly schema: TZ;
}

// oxlint-disable-next-line typescript/consistent-return
export const fetchParsedResourceData = async <TZ extends ZodType>({
	endpoint,
	schema
}: Readonly<FetchResourceProps<TZ>>): Promise<z.infer<TZ>> => {
	try {
		const response = await fetch(endpoint);

		if (!response.ok) {
			throw new Error(`Resource Fetching Failed: ${endpoint}`);
		}

		const data: unknown = await response.json();

		return schema.parse(data);
	} catch (error) {
		if (error instanceof ZodError) {
			// oxlint-disable-next-line unicorn/no-null
			console.error("Validation failed:", endpoint, JSON.stringify(treeifyError(error), null, 2));
		} else {
			console.error("Fetch failed:", error);
		}
		process.exit(1);
	}
};
