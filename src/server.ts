import express, { json } from "express";
import { RegisterRoutes } from "./routes/routes";
import swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger.json";

const app = express();
app.use(json());

RegisterRoutes(app);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
    console.log("Swagger running on http://localhost:3000/docs");
});
