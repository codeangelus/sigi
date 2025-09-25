import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const MaquinaModeloPeca = sequelize.define("MaquinaModeloPeca", {
  quantidade: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
});

export default MaquinaModeloPeca;
