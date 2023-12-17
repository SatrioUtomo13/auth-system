/* === IMPORT === */
import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

/* === STRUCTURE TABLE PRODUCT === */
const Product = db.define('products', {
    name: DataTypes.STRING,
    model: DataTypes.STRING,
    status: DataTypes.STRING
}, {
    freezeTableName:true,
    timestamps: false
});

export default Product