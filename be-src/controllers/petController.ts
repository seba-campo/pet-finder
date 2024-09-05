import { db } from "../db";
import { Pet } from "../models/pet";
import { Usuario } from "../models/user";
import * as userController from "../controllers/usuariosController"

/*
export const Pet = db.define("Pets", {
    nombre: {type: DataTypes.STRING, allowNull: false},
    found: {type: DataTypes.BOOLEAN},
    location: {type: DataTypes.STRING, allowNull: false},
    user_id: {type: DataTypes.INTEGER, allowNull: false},
    imagen: {type: DataTypes.TEXT}
})
*/

type PetData = {
    nombre: string,
    found: boolean,
    location: string,
    imagen: string
}

type AlertData = { 
    nombre: string,
    telefono: number,
    message: string
}

export type Location = {
    lat: number,
    long: number
}

async function getPetById(id: number){
    // Buscar en la DB la info de dicho PET.
    const petFound = await Pet.findByPk(id);
    if(petFound === null){
        throw "No existe ningún pet con ese ID"
    }
    else{
        return petFound
    }
}

async function getPetsByLocation(loc: Location){
    return loc
}

async function createLostPetReport(data: PetData, userId: number){
    try{
        console.log(data, userId)
        const newPetReport = await Pet.create({
                nombre: data.nombre,
                found: data.found,
                location: data.location,
                user_id: userId,
                imagen: data.imagen
        });
        return newPetReport
    }
    catch(e){
        return e
    }

}

async function alertReport(reportId: number, reporterId: number, alertData: AlertData){
    // Alertar reporte ID, es reportado por.... y envia mail a dicho user.
    const userData = await userController.getUsuarios(reporterId);

    // Enviar mail al correo del user
    const userMail = userData.mail;
    console.log(userMail)
    
}


export { createLostPetReport, alertReport, getPetById, getPetsByLocation}