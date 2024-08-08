import { db } from "../db";
import { DataTypes } from "sequelize";
import { Auth } from "./auth";

export const Usuario = db.define("Usuarios", {
    nombre: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    location: {type: DataTypes.STRING},
});

Usuario.hasOne(Auth,{as: "Auth", foreignKey: "user_id"});