import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import swaggerUI from "swagger-ui-express";

import { errorHandlerMiddleware } from "./middlewares/errorHandler.middleware";
import router from "./routes/index.route";
import { swaggerSpec } from "./config/swagger.config";

const app = express();

// Middlewares
app.use(express.json()); // Permitir la conversion del req.body en un objeto de js
app.use(morgan("dev")); // Hacemos uso del HTTP Request Logger con la configuración dev
app.use(cookieParser()); // Permitir req.cookies se transofrmen a onjeto de js
app.use(cors()); // Uso de cors

/*
app.use(
    cors({
        origin: ["http://localhost:3000", "http://localhost:5173"]
        credentials: true,
    })
);
*/

// Routes
app.use("/api", router);

// Middleware Response
app.use(errorHandlerMiddleware);

// Swagger
app.use(
    "/api/docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec, {
        customCssUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.13.0/swagger-ui.min.css",
        customJs:
            "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.13.0/swagger-ui-bundle.min.js",
    })
);

export default app;
