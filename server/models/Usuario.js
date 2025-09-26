import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Usuario = sequelize.define( 'Usuario', {
    login: {
        type: DataTypes.STRING,
        unique: true,
        allowNull:false,
        required: true,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
    },
});



export default Usuario;