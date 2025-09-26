import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";





const Peca = sequelize.define('Peca', {
    codigo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
    },
    dt_inicio: {
        type: DataTypes.STRING,
    },
    dt_final: {
        type: DataTypes.STRING,
    },    
    imageUrl : {
        type: DataTypes.STRING,
        allowNull:      true,
        defaultValue:  null,
    },
    status : {
        type: DataTypes.STRING,
    },
});


export default Peca;





