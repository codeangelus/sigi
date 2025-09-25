import { sequelize } from "./models/index.js";


const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com o banco estabelecida!");

    await sequelize.sync({ force: true }); 
    //  force: true apaga e recria as tabelas sempre que rodar
    //  troque depois para { alter: true } para só atualizar

    console.log(" Tabelas sincronizadas com sucesso!");
    process.exit();
  } catch (error) {
    console.error(" Erro ao sincronizar o banco:", error);
    process.exit(1);
  }
};

syncDatabase();
