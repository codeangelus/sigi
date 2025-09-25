const { DataTypes } = require("sequelize");
import sequelize from "../config/db.js";

const Perfil = sequelize.define("Perfil", {
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

export default Perfil;
