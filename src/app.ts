import express from "express";
import { RegisterRoutes } from './route/routes';
import { setupSwagger } from "./config/Swagger";
import { verificaAtrasoEReativa } from "./routine/VerificaAtraso";
import { inicializarTabelas } from "./database/initializer";


async function app() {
    await inicializarTabelas();

    const app = express();

    const PORT = process.env.PORT ?? 3090;

    app.use(express.json());

    const apiRouter = express.Router();
    RegisterRoutes(apiRouter);

    app.use("/library", apiRouter);

    RegisterRoutes(app);

    setupSwagger(app);

    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`)
        verificaAtrasoEReativa();
    });
}

app().catch((error: any) => {
  console.error("Erro ao iniciar:", error);
});