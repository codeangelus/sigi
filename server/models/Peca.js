const { DataTypes } = require("sequelize");
import sequelize from "../config/db.js";


const MaquinaModelo = require("./MaquinaModelo");
const MaquinaProducao = require("./MaquinaProducao");


const Peca = sequelize.define('Peca', {
    codigo: {
        type: Sequelize.STRING,
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
        type: Sequelize.STRING,
        allowNull:      true,
        defaultValue:  null,
    },
    status : {
        type: Sequelize.STRING,
        allowNull: false
    },
});




export default Peca;





