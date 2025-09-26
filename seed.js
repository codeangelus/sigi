// seed.js
import { sequelize } from "./server/models/index.js";
import Usuario from "./server/models/Usuario.js";
import Perfil from "./server/models/Perfil.js";
import Peca from "./server/models/Peca.js";
import Maquina from "./server/models/MaquinaModelo.js";
import DV from "./server/models/Dv.js";

async function seed() {
  try {
    await sequelize.authenticate();
    console.log(" Conectado ao banco.");

    // recria as tabelas em modo dev
    await sequelize.sync({ force: true });

    // --- Perfis ---
    const perfis = await Perfil.bulkCreate([
      { tipo: "Admin" },
      { tipo: "Operador" },
      { tipo: "Gerente" },
    ]);
    console.log(" Perfis criados");

    // --- Usuários ---
    const usuarios = await Usuario.bulkCreate([
      { login: "Gabriel", senha: "senha123", perfilId: perfis[0].id },
      { login: "maria", senha: "senha123", perfilId: perfis[1].id },
    ]);
    console.log(" Usuários criados");

    // --- Peças ---
    const pecas = await Peca.bulkCreate([
      { codigo: "AX-030", nome: "Parafuso Rebite" },
      { codigo: "PECA2", nome: "Peça de Teste"},
      { codigo: "PS-10405", nome: "Binboca da Parafuseta"},
    ]);
    console.log(" Peças criadas");

    // --- Máquinas ---
    //const maquinas = await Maquina.bulkCreate([
    //  { codigo: "M-001", nome: "Prensa Hidráulica" },
    //  { codigo: "M-002", nome: "Fresadora CNC" },
    //]);
    //console.log(" Máquinas criadas");

    // --- DVs ---
    await DV.bulkCreate([
      { numero: "DV-0001"/*, descricao: "Produção Lote A", usuarioId: usuarios[0].id */},
      { numero: "DV-0002"/*, descricao: "Produção Lote B", usuarioId: usuarios[1].id */},
    ]);
    console.log(" DVs criadas");

    console.log(" Banco populado com sucesso!");
    process.exit(0);
  } catch (error) {
    console.error(" Erro ao rodar seed:", error);
    process.exit(1);
  }
}

seed();
