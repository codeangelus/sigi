const { DataTypes }  = require("sequelize");
import sequelize from "../config/db.js";

const Usuario = sequelize.define( Usuario, {
    nome_login: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false,
    },
    senha_hash: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});



export default Usuario;