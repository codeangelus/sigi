const { DataTypes } = require("sequelize");
import sequelize from "../config/db.js";



const MaquinaFinal = sequelize.define("MaquinaFinal", {
  status: {
    type: DataTypes.STRING,
  },
  dt_entrega: {
    type : DataTypes.DATE,
  },

});




export default MaquinaFinal;
