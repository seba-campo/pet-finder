import { db } from "../db";
import { DataTypes } from "sequelize";
import { Usuario } from "./user";

// const nanoid = customAlphabet('1234567890', 6)

export const Pet = db.define("Pets", {
    nombre: {type: DataTypes.STRING, allowNull: false},
    found: {type: DataTypes.BOOLEAN},
    location: {type: DataTypes.STRING, allowNull: false},
    user_id: {type: DataTypes.INTEGER, allowNull: false},
    imagen: {type: DataTypes.TEXT}
})

Pet.belongsTo(Usuario,{as: "Auth", foreignKey: "user_id"})