import { Pet } from "../models/pet";
import * as userController from "../controllers/usuariosController"
import { algoliaDb } from "../db/algolia";

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
    location: any,
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
};

async function getPets(by: string, id?: number, loc?: Location, uId?: number){
    if(by == "all"){
        const pets = await Pet.findAll();
        return pets
    }
    if(by == "location"){
        // TODO logica en algolia de busqueda por location
        return loc
    }
    if(by == "id"){
        // Buscar en la DB la info de dicho PET.
        const petFound = await Pet.findByPk(id);
        if(petFound === null){
            throw "No existe ningún pet con ese ID"
        }
        else{
            return petFound
        }
    }
    if(by == "userId"){
        const pets = await Pet.findAll({
            where: {
                user_id: uId
            }
        })
        return pets
    }
};

async function createLostPetReport(data: PetData, userId: number){
    try{
        // Se crea registro en SQL
        const newPetReport = await Pet.create({
            nombre: data.nombre,
            found: data.found,
            location: data.location,
            user_id: userId,
            imagen: data.imagen
        });
        console.log(data, userId)
        // Se crea indice en ALGO
        const index = algoliaDb.initIndex("pet_locations");
        await index.saveObject(
            {
                "_geoloc": {
                  "lat": data.location.lat,
                  "lng": data.location.lng
                },
                petId: userId
            },
            {autoGenerateObjectIDIfNotExist: true})
        console.log("Creado registro en Algolia")
        return newPetReport
    }
    catch(e){
        return e
    }
};

// TODO
async function alertReport(reportId: number, reporterId: number, alertData: AlertData){
    // Alertar reporte ID, es reportado por.... y envia mail a dicho user.
    const userData = await userController.getUsuarios(reporterId);

    // Enviar mail al correo del user
    const userMail = userData.mail;
    console.log(userMail) 
};

export { createLostPetReport, alertReport, getPets }