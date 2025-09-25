// testSequelize.js
import { sequelize, Usuario, Perfil, Peca } from "./index.js";

const testSequelize = async () => {
  try {
    // Testar conexão
    await sequelize.authenticate();
    console.log(" Conexão com o banco estabelecida!");

    // Sincronizar (sem apagar tudo)
    await sequelize.sync({ alter: true });

    // Criar um perfil
    const perfil = await Perfil.create({ tipo: "Admin" });

    // Criar um usuário vinculado ao perfil
    const usuario = await Usuario.create({
      login: "testeUser",
      senha: "12345",
      perfilId: perfil.id,
    });

    // Criar uma peça
    const peca = await Peca.create({
      codigo: "AX-1001",
      nome: "Parafuso Inox",
    });

    // Buscar usuário com join de perfil
    const usuarioComPerfil = await Usuario.findOne({
      where: { id: usuario.id },
      include: Perfil,
    });

    console.log(" Usuário criado:", usuarioComPerfil.toJSON());
    console.log(" Peça criada:", peca.toJSON());

  } catch (error) {
    console.error(" Erro nos testes:", error);
  } finally {
    await sequelize.close();
    console.log(" Conexão fechada.");
  }
};

testSequelize();
