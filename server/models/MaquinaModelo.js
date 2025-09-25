import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const MaquinaModelo = sequelize.define("MaquinaModelo", {
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING
  }
});




export default MaquinaModelo;
