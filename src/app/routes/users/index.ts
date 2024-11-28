import { createRoute } from "@hono/zod-openapi";
import { CreateUserSchema, ParamsSchema, UpdateUserSchema, UserSchema, UsersSchema } from "#/app/routes/users/schema";
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

export const createUser = createRoute({
    method: "post",
    path: "/",
    request: {
        body: {
            content: { "application/json": { schema: CreateUserSchema } },
            required: true,
            description: "User to create",
        },
    },
    responses: {
        201: { content: { "application/json": { schema: UserSchema } }, description: "Create a user" },
        400: { content: { "application/json": { schema: ErrorSchema } }, description: "Bad Request" },
        409: { content: { "application/json": { schema: ErrorSchema } }, description: "User already exists" },
    },
});

export const updateUser = createRoute({
    method: "patch",
    path: "/{id}",
    request: {
        params: ParamsSchema,
        body: {
            content: { "application/json": { schema: UpdateUserSchema } },
            required: true,
            description: "User to update",
        },
    },
    responses: {
        200: { content: { "application/json": { schema: UserSchema } }, description: "Update a user" },
        400: { content: { "application/json": { schema: ErrorSchema } }, description: "Bad Request" },
        404: { content: { "application/json": { schema: ErrorSchema } }, description: "User not found" },
    },
});
