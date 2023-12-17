/* === IMPORT === */
import { Sequelize } from "sequelize";

/* === CREATE DATABASE CONNECTION === */
const db = new Sequelize('authenticate', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;