// Servicio
import * as Express from "express"
import * as bodyParser from "body-parser";
import * as cors from "cors";


const app = Express();
const PORT = 3015;
app.use(cors());

// Registro y login de usuarios

// Modificacion de datos de usuario





app.listen(PORT, ()=>{
    console.log("App lanzada en: ", PORT);
});