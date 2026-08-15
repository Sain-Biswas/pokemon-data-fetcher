import { z } from "zod";

const NamedAPIResourceZodSchema = z.object({
  name: z.string().describe("The name of the referenced resource."),
  url: z.url().describe("The URL of the referenced resource."),
})


const APIResourceZodSchema = z.object({
  url: z.url().describe("The URL of the referenced resource."),
});


export { NamedAPIResourceZodSchema, APIResourceZodSchema }