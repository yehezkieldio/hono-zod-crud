import { createRoute } from "@hono/zod-openapi";
import { ParamsSchema, UserSchema, UsersSchema } from "#/app/routes/users/schema";
import { ErrorSchema } from "#/shared/schema";

export const getUsers = createRoute({
    method: "get",
    path: "/",
    responses: {
        200: { content: { "application/json": { schema: UsersSchema } }, description: "Retrieve the users" },
        400: { content: { "application/json": { schema: ErrorSchema } }, description: "Bad Request" },
    },
});

export const getUser = createRoute({
    method: "get",
    path: "/{id}",
    request: {
        params: ParamsSchema,
    },
    responses: {
        200: { content: { "application/json": { schema: UserSchema } }, description: "Retrieve the user" },
        400: { content: { "application/json": { schema: ErrorSchema } }, description: "Bad Request" },
        404: { content: { "application/json": { schema: ErrorSchema } }, description: "User not found" },
    },
});
