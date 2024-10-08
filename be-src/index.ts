// Servicio
import * as Express from "express"
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as path from "path"
// Controllers
import * as userController from "./controllers/usuariosController"
import * as petController from "./controllers/petController"
import { Usuario } from "./models/user";
import { db } from "./db";

const staticDirPath = path.resolve(__dirname, "../fe-dist");
const app = Express();
const PORT = 3015;
app.use(cors());
app.use(bodyParser())
app.use(Express.static(staticDirPath));

// Registro y login de usuarios
app.post("/user", async (req, res)=>{
    try{
        const registro = await userController.registrarUsuarioNuevo(req.body);
        res.status(201).send(registro)
    }catch(e){
        res.status(400).send(e);
    }
});

// USERS
app.get("/user", async (req,res)=>{
    try{
        res.send(await userController.getAllUsuarios()) 
    }catch(e){
        res.status(500).send(e)
    }
})

app.get("/user/by", async (req,res)=>{
    const id = req.query.id as any;
    const email = req.query.email as string;
    if(id){
        try{
            res.send(await userController.getUsuarioById(parseInt(id)))
        }
        catch(e){
            res.status(500).send(e)
        }
    }
    if(email){
        try{
            res.send(await userController.getUsuarioByMail(email))
        }
        catch(e){
            res.status(500).send(e)
        }
    }
})

app.post("/auth", async (req,res)=>{
    const userData = {
        email: req.body.email,
        password: req.body.password
    }
    res.send(await userController.authUser(userData))
});

// PETS

// Create lost pet report
app.post("/pets", async (req, res)=>{
    try{
        const { nombre, found, location, user_id, imagen } = req.body;
        const petData = {nombre,found,location,imagen};
        res.send(await petController.createLostPetReport(petData, user_id))
    }
    catch(e){
        res.status(500).send(e)
    }
})

// All Pets
app.get("/pets", async (req, res)=>{
    if(req.body.location){
        res.send(await petController.getPets("location", null, req.body.location))
    }
    if(Object.keys(req.body).length === 0){
        res.send(await petController.getPets("all", null, null))
    }
})

app.get("/pets/:id", async (req, res)=>{
    res.send(await petController.getPets("id", parseInt(req.params.id)))
})

app.get("/petsByUser/:id", async(req, res)=>{
    res.send(await petController.getPets("userId", null, null, parseInt(req.params.id)))
})

app.get("*", (req, res) => {
  res.sendFile(staticDirPath + "/index.html");
});

// Modificacion de datos de usuario




// Publicar mascota perdida


app.listen(PORT, ()=>{
    console.log("App lanzada en: ", PORT);
});