// Servicio
import * as Express from "express"
import * as bodyParser from "body-parser";
import * as cors from "cors";
// Controllers
import * as userController from "./controllers/usuariosController"
import { Usuario } from "./models/user";
import { db } from "./db";



const app = Express();
const PORT = 3015;
app.use(cors());
app.use(bodyParser())

// Registro y login de usuarios
app.post("/user", async (req, res)=>{
    try{
        const registro = await userController.registrarUsuarioNuevo(req.body);
        res.status(201).send(registro)
    }catch(e){
        res.status(400).send(e);
    }    
});
// Get Users data
app.get("/user", async (req,res)=>{
    try{
        res.send(await userController.getUsuarios()) 
    }catch(e){
        res.status(500).send(e)
    }
})

app.get("/user/:id", async (req,res)=>{
    try{
        const id = parseInt(req.params.id);
        res.send(await userController.getUsuarios(id))
    }catch(e){
        res.status(500).send(e)
    }
})

// Modificacion de datos de usuario




// Publicar mascota perdida


app.listen(PORT, ()=>{
    console.log("App lanzada en: ", PORT);
});