import type { OpenAPIHono, OpenAPIObjectConfigure } from "@hono/zod-openapi";
import { type ApiReferenceOptions, apiReference } from "@scalar/hono-api-reference";
import type { Env } from "hono";

export const openAPISpecification = (app: OpenAPIHono) => {
    const openAPISpec: OpenAPIObjectConfigure<Env, "/openapi.json"> = {
        openapi: "3.0.0",
        info: {
            title: "My API",
            version: "1.0.0",
        },
    };

    app.doc("/openapi.json", openAPISpec);

    const apiDocsConfig: ApiReferenceOptions = {
        spec: {
            url: "/openapi.json",
        },
    };

    app.get("/api-docs", apiReference(apiDocsConfig));
};
