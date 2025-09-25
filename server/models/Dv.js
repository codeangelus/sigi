const { DataTypes } = require("sequelize");
import sequelize from "../config/db.js";





const Dv = sequelize.define("Dv", {
  numero: {  //DV0201
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  cliente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dt_inicio: {
    type: DataTypes.DATE,
  },
  dt_fim: {
    type: DataTypes.DATE,
  },  

});

export default Dv;