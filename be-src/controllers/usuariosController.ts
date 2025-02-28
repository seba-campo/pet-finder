import { where } from "sequelize";
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

type UsuarioData = {
    nombre: string,
    email: string,
    location: string,
    password: string
};

type newUserData = {
    nombre: string,
    email: string,
    location: string
}

const getSHA256ofSTRING = function(input){
    return crypto.createHash('sha256').update(input).digest('hex');
};

async function authUser(userData){
    // cifrar la contraseña
    const passwordHash = getSHA256ofSTRING(userData.password);
    
    const userToAuth = await Auth.findOne({
        where: { email: userData.email}
    })
    if(userToAuth === null){
        return 404
    } else {
        const data = await userToAuth as any
        // TODO, generar JWT para session
        return data.password == passwordHash ? 200 : 401;
    }
};

async function registrarUsuarioNuevo(data: UsuarioData){
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
    } else {
        throw "Usuario ya existente."
    }
};

async function getUsuarioByMail(mail: string){
    try{
        const userFound = await Usuario.findOne({
            where:{
                email: mail
            }
        })

        return userFound
    }
    catch(e){
        return e
    }
}

async function getUsuarioById(id: number){
    try{
        console.log("Pedir usuario ", id)
        return await Usuario.findByPk(id)
    } catch(e) {
        return e
    }
};

async function getAllUsuarios(){
    const user = await Usuario.findAll();
    return user
}

async function updateUser(id: number, newData: newUserData){
    const userData = await Usuario.findByPk(id);

    if(userData == null){
        return 404
    }else{
        newData.nombre ? userData.set({nombre: newData.nombre}) : null;
        newData.email ? userData.set({email: newData.email}) : null;
        newData.location ? userData.set({location: newData.location}) : null;
        userData.save()
        return 200
    }
}

export { registrarUsuarioNuevo, getAllUsuarios, getUsuarioById, authUser, getUsuarioByMail, updateUser }