import { z } from "@hono/zod-openapi";
import { RoleSchema } from "#/generated/index";

export const ParamsSchema = z
    .object({
        id: z
            .string()
            .min(3)
            .openapi({ param: { name: "id", in: "path" }, example: "1" }),
    })
    .openapi("UserParams");

export const UserSchema = z
    .object({
        role: RoleSchema,
        id: z.string().cuid(),
        email: z.string(),
        name: z.string().nullable(),
    })
    .openapi("User");

export const UsersSchema = z.array(UserSchema).openapi("Users");

export const CreateUserSchema = z
    .object({
        email: z.string().email(),
        name: z.string().nullable(),
        password: z.string().min(8),
        role: RoleSchema,
    })
    .openapi("CreateUser");

export const UpdateUserSchema = z
    .object({
        name: z.string().nullable(),
        role: RoleSchema,
    })
    .openapi("UpdateUser");
