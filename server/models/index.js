import sequelize from "../config/db.js";

// Imports de todos os models
import Usuario from "./Usuario.js";
import Perfil from "./Perfil.js";
import Dv from "./Dv.js";
import MaquinaFinal from "./MaquinaFinal.js";
import Peca from "./Peca.js";
import MaquinaModelo from "./MaquinaModelo.js";
import MaquinaProducao from "./MaquinaProducao.js";
import MaquinaModeloPeca from "./MaquinaModeloPeca.js";

// -------------------- RELAÇÕES -------------------- //

// Perfil 1:N Usuario
Perfil.hasMany(Usuario, { foreignKey: "perfilId" });
Usuario.belongsTo(Perfil, { foreignKey: "perfilId" });

// Dv 1:N MaquinaFinal
Dv.hasMany(MaquinaFinal, { foreignKey: "dvId" });
MaquinaFinal.belongsTo(Dv, { foreignKey: "dvId" });

// N:N Peca : MaquinaModelo
Peca.belongsToMany(MaquinaModelo, {
  through: "MaquinaModeloPeca",
  foreignKey: "pecaId",
  otherKey: "maquinaModeloId"
});

MaquinaModelo.belongsToMany(Peca, {
  through: "MaquinaModeloPeca",
  foreignKey: "maquinaModeloId",
  otherKey: "pecaId"
});

// N:N Peca : MaquinaProducao
Peca.belongsToMany(MaquinaProducao, {
  through: "MaquinaProducaoPeca",
  foreignKey: "pecaId",
  otherKey: "maquinaProducaoId"
});

MaquinaProducao.belongsToMany(Peca, {
  through: "MaquinaProducaoPeca",
  foreignKey: "maquinaProducaoId",
  otherKey: "pecaId"
});


// -------------------- EXPORT -------------------- //
export {
  sequelize,
  Usuario,
  Perfil,
  Dv,
  MaquinaFinal,
  Peca,
  MaquinaModelo,
  MaquinaProducao,
  MaquinaModeloPeca,
};
