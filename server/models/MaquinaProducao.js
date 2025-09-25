import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const MaquinaProducao = sequelize.define("MaquinaProducao", {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  setor: {
    type: DataTypes.STRING,
  }
});


export default MaquinaProducao;
