import { OpenAPIHono } from "@hono/zod-openapi";
import { getUser, getUsers } from "#/app/routes/users";
import prisma from "#/shared/prisma";

const usersApp = new OpenAPIHono()
    .openapi(getUsers, async (c) => {
        const users = await prisma.user.findMany();

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
    );

export default usersApp;
