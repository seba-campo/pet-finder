import { db } from "../db";
import { DataTypes } from "sequelize";

// const nanoid = customAlphabet('1234567890', 6)

export const Pet = db.define("Pets", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: {type: DataTypes.STRING, allowNull: false},
    location: {type: DataTypes.STRING, allowNull: false},
    imagen: {type: DataTypes.TEXT}
})

// Cliente.hasMany(Caballo,{as: "Caballo", foreignKey: "idPropietario"});