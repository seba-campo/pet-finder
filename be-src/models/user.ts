import { db } from "../db";
import { DataTypes } from "sequelize";

// const nanoid = customAlphabet('1234567890', 6)

export const Usuario = db.define("Usuarios", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    location: {type: DataTypes.STRING, defaultValue: "pendiente"},
})

// Cliente.hasMany(Caballo,{as: "Caballo", foreignKey: "idPropietario"});