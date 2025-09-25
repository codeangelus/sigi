import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Usuario = sequelize.define( 'Usuario', {
    login: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});



export default Usuario;