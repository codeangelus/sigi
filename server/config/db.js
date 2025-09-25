import { Sequelize } from "sequelize";
import dbConfig from "./database.config.js";

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.PORT,
    pool: dbConfig.pool,
    logging: dbConfig.logging,
  }
);

export default sequelize;
