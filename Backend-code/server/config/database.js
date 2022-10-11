require("dotenv").config();
const database = {
  default: process.env.DATABASETYPE || "mysql",
  mysql: {
    connectionLimit: 100,
    host: process.env.HOST || "127.0.0.1",
    user: process.env.USERNAME || "root",
    password: process.env.PASSWORD || "root@1234",
    database: process.env.DATABASE || "shushly",
    charset: "utf8mb4",
  },
  url: "",
};

module.exports = database;
