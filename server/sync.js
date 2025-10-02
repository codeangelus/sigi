// sync.js
import { sequelize } from "./models/index.js";

const syncDb = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexão com o banco estabelecida.");

    await sequelize.sync({ alter: true }); 
    // { alter: true } ajusta tabelas sem apagar
    // { force: true } apaga tudo e recria

    console.log(" Banco sincronizado com sucesso!");
  } catch (err) {
    console.error("Erro ao sincronizar:", err);
  } finally {
    process.exit();
  }
};

syncDb();
