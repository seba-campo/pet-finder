import { db } from "../db";
import { Auth } from "../models/auth";
import { Usuario } from "../models/user";
import * as crypto from "crypto"


/*
export const Usuario = db.define("Usuarios", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    nombre: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, allowNull: false},
    location: {type: DataTypes.STRING, defaultValue: "pendiente"},
})
*/

const getSHA256ofSTRING = function(input){
    return crypto.createHash('sha256').update(input).digest('hex')
};

export async function registrarUsuarioNuevo(data){
    if(!data){
        throw "Informacion del usuario incorrecta"
    }
    else{
        const [newUser, created] = await Usuario.findOrCreate({
            where:{
                email: data.email
            },
            defaults:{
                nombre: data.nombre,
                email: data.email,
                location: data.location
            }
        });

        if(created){
            console.log(newUser.dataValues.id)
            const newAuth = await Auth.create({
                email: data.email,
                password: getSHA256ofSTRING(data.password),
                user_id: newUser.dataValues.id
            })
            return newUser
        }
        else{
            throw "Usuario ya existente."
        }
    }
};