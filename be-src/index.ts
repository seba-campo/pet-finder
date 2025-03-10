// Servicio
import * as Express from "express"
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as path from "path"
// Controllers
import * as userController from "./controllers/usuariosController"
import * as petController from "./controllers/petController"
import * as mailController from "./controllers/mailController"
import { loadKeys } from "./controllers/keysController";
import { Usuario } from "./models/user";
import { db } from "./db";

const staticDirPath = path.resolve(__dirname, "../fe-build");
const app = Express();
const PORT = 3015;
app.use(cors());
app.use(Express.json({ limit: '2mb' }));
app.use(bodyParser())
app.use(Express.static(staticDirPath));
// loadKeys()

// Registro y login de usuarios
app.post("/user", async (req, res)=>{
    try{
        const registro = await userController.registrarUsuarioNuevo(req.body);
        res.status(201).send(registro)
    }catch(e){
        res.status(400).send(e);
    }
});

app.put("/user/:id", async (req, res)=>{
    try {
        const id = parseInt(req.params.id);
        const newData = req.body;
        const result = await userController.updateUser(id, newData);
        
        if (result === 404) {
            res.status(404).json({ error: "User not found" });
        } else {
            res.status(200).json({ message: "User updated successfully" });
        }
    } catch (e) {
        res.status(500).json({ error: "Error updating user" });
    }
}) 

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
        const { nombre, found, location, user_id, imagen, locationName } = req.body;
        const petData = {nombre,found,location,imagen,locationName};
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
});

app.get("/pets/:id", async (req, res)=>{
    res.send(await petController.getPets("id", parseInt(req.params.id)))
});

app.get("/petsByUser/:id", async(req, res)=>{
    res.send(await petController.getPets("userId", null, null, parseInt(req.params.id)))
});

app.get("*", (req, res) => {
  res.sendFile(staticDirPath + "/index.html");
});

// MAILS
app.put("/mail", async(req, res)=>{
    const { from, to, message, pet} = req.body;
    res.send(await mailController.sendMail(from, to, pet, message))
});

// Modificacion de datos de usuario
// Publicar mascota perdida
app.listen(PORT, ()=>{
    console.log("App lanzada");
});