import { db } from ".";
import { Usuario } from "../models/user";
import { Auth } from "../models/auth";
import { Pet } from "../models/pet";


(async ()=>{
   try{
    await Usuario.sync({alter: true})
    await Auth.sync({alter: true})
    await Pet.sync({alter: true})
    }
    catch(e){
        console.log(e)
    }
})()