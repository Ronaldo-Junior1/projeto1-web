"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./route/routes");
const Swagger_1 = require("./config/Swagger");
const VerificaAtraso_1 = require("./routine/VerificaAtraso");
const initializer_1 = require("./database/initializer");
async function app() {
    await (0, initializer_1.inicializarTabelas)();
    const app = (0, express_1.default)();
    const PORT = process.env.PORT ?? 3090;
    app.use(express_1.default.json());
    const apiRouter = express_1.default.Router();
    (0, routes_1.RegisterRoutes)(apiRouter);
    app.use("/library", apiRouter);
    (0, routes_1.RegisterRoutes)(app);
    (0, Swagger_1.setupSwagger)(app);
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
        (0, VerificaAtraso_1.verificaAtrasoEReativa)();
    });
}
app().catch((error) => {
    console.error("Erro ao iniciar:", error);
});
