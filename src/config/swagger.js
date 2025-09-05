import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "V I Z I T O M",
      version: "1.0.0",
      description: "APIs",
    },
    servers: [
      {
        url: "http://localhost:4000/api",
        description: "Local server",
      },
    ],
  },
  apis: ["./src/modules/**/*.js"], 
};

const swaggerSpec = swaggerJSDoc(options);

export function swaggerDocs(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📄 Swagger UI => http://localhost:4000/api-docs active");
}
