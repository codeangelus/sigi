//import "./sync.js"; 

import express from "express";

// Importação das Rotas
import pecaRoutes from "./server/routes/pecaRoutes.js";
import dvRoutes from "./server/routes/dvRoutes.js";
import usuarioRoutes from "./server/routes/usuarioRoutes.js"




const app = express();
app.use(express.json());

// definição das Rotas
app.use("/pecas", pecaRoutes);
app.use("/dvs", dvRoutes);
app.use("/users", usuarioRoutes);
app.use("/maquinas", maquinaModeloRoutes);
app.use("/prod", MaquinaProducaoRoutes);



// Inicia o servidor
app.listen(3000, () => {
  console.log("🚀 Servidor rodando em http://localhost:3000");
});