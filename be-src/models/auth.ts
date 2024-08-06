import { db } from "../db";
import { DataTypes } from "sequelize";

export const Auth = db.define("Auth", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, allowNull: false}, //mail es el identificador
    password: {type: DataTypes.STRING, allowNull: false},
});