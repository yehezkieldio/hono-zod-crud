import { z } from "zod";

export const ErrorSchema = z.object({
    code: z.number().openapi({ example: 400 }),
    message: z.string().openapi({ example: "Bad Request" }),
});
