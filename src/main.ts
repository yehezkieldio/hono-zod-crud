import { OpenAPIHono } from "@hono/zod-openapi";

import usersApp from "#/app/routes/users/route";
import { openAPISpecification } from "#/config/openapi";

export const app = new OpenAPIHono();

app.route("/users", usersApp);

openAPISpecification(app);

export default app;
