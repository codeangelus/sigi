export default {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "12345",
    DB: "sigi",
    dialect: "postgres",
    PORT: "5432",
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 1000,
    },
    logging: false,  //remove os logs
};