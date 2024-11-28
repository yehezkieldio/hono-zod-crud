import { OpenAPIHono } from "@hono/zod-openapi";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "#/app/routes/users";
import prisma from "#/shared/prisma";

const usersApp = new OpenAPIHono()
    .openapi(getUsers, async (c) => {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            },
        });

        return c.json(users, 200);
    })
    .openapi(
        getUser,
        async (c) => {
            const { id } = c.req.valid("param");

            const user = await prisma.user.findUnique({
                where: {
                    id,
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                },
            });

            if (!user) {
                return c.json(
                    {
                        code: 404,
                        message: "User not found",
                    },
                    404,
                );
            }

            return c.json(user, 200);
        },
        (result, c) => {
            if (!result.success) {
                return c.json(
                    {
                        code: 400,
                        message: "Validation Error",
                    },
                    400,
                );
            }
        },
    )
    .openapi(
        createUser,
        async (c) => {
            const data = c.req.valid("json");

            const existingUser = await prisma.user.findUnique({
                where: {
                    email: data.email,
                },
            });
            if (existingUser) {
                return c.json(
                    {
                        code: 409,
                        message: "User already exists",
                    },
                    409,
                );
            }

            const user = await prisma.user.create({
                data: {
                    email: data.email,
                    name: data.name,
                    role: data.role,
                    password: await Bun.password.hash(data.password),
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                },
            });

            return c.json(user, 201);
        },
        (result, c) => {
            if (!result.success) {
                return c.json(
                    {
                        code: 400,
                        message: "Validation Error",
                    },
                    400,
                );
            }
        },
    )
    .openapi(
        updateUser,
        async (c) => {
            const { id } = c.req.valid("param");
            const data = c.req.valid("json");

            const existingUser = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            if (!existingUser) {
                return c.json(
                    {
                        code: 404,
                        message: "User not found",
                    },
                    404,
                );
            }

            const user = await prisma.user.update({
                where: {
                    id: id,
                },
                data: {
                    name: data.name,
                    role: data.role,
                },
                select: {
                    id: true,
                    email: true,
                    name: true,
                    role: true,
                },
            });

            return c.json(user, 200);
        },
        (result, c) => {
            if (!result.success) {
                return c.json(
                    {
                        code: 400,
                        message: "Validation Error",
                    },
                    400,
                );
            }
        },
    )
    .openapi(
        deleteUser,
        async (c) => {
            const { id } = c.req.valid("param");

            const existingUser = await prisma.user.findUnique({
                where: {
                    id: id,
                },
            });
            if (!existingUser) {
                return c.json(
                    {
                        code: 404,
                        message: "User not found",
                    },
                    404,
                );
            }

            await prisma.user.delete({
                where: {
                    id: id,
                },
            });

            c.status(204);
            return new Response();
        },
        (result, c) => {
            if (!result.success) {
                return c.json(
                    {
                        code: 400,
                        message: "Validation Error",
                    },
                    400,
                );
            }
        },
    );

export default usersApp;
