import express from "express";

// Importação das Rotas
import pecaRoutes from "./server/routes/pecaRoutes.js";
import dvRoutes from "./server/routes/dvRoutes.js";
import usuarioRoutes from "./server/routes/usuarioRoutes.js";
import maquinaRoutes from "./server/routes/maquinaRoutes.js";
import MaquinaProducaoRoutes from "./server/routes/producaoRoutes.js";
import MaquinaPecaRoutes from "./server/routes/maquinaPecaRoutes.js";
import cors from "cors";






const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.use(cors());

// definição das Rotas
app.use("/pecas", pecaRoutes);
app.use("/dvs", dvRoutes);
app.use("/users", usuarioRoutes);
app.use("/maquinas", maquinaRoutes);
app.use("/prod", MaquinaProducaoRoutes);''
app.use("/associate",MaquinaPecaRoutes);

// Rota de teste
app.get("/", (req, res) => {
  res.send(" API funcionando!");
});



// Inicia o servidor
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

