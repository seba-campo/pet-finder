import { Router } from "@vaadin/router";
import { Pet } from "./lib/types";
import { v2 as cloudinary } from 'cloudinary';

const PORT_API = 3015;
const CLOUD_NAME= "dlhotzwpo"
const CLOUD_API_KEY = "658649741377831"
const CLOUD_API_SECRET = "ZgXXDgM8aUYnFBVI-J5DCwUITjw"

cloudinary.config({ 
    cloud_name: CLOUD_NAME, 
    api_key: CLOUD_API_KEY, 
    api_secret: CLOUD_API_SECRET
});

// const optimizeUrl = cloudinary.url('shoes', {
//     fetch_format: 'auto',
//     quality: 'auto'
// });

// // Transform the image: auto-crop to square aspect_ratio
// const autoCropUrl = cloudinary.url('shoes', {
//     crop: 'auto',
//     gravity: 'auto',
//     width: 500,
//     height: 500,
// });

export const deployState = {
    data:{
        deployed: false,
        api_url: `http://localhost:${PORT_API}`
    },
    setState(newState) {
        this.data = newState;
    },
    getState(){
        return this.data;
    },
    setDeployedStatus(status : boolean){
        const cs = this.getState();
        cs.deployed = status
        this.setState(cs)
    },
    getDeployStatus(){
        return this.data.deployed;
    },
    getApiUrl(){
        return this.data.api_url;
    },
    setApiUrl(env){
        const cs = this.getState();
        if(env == "dev"){
            cs.api_url = `http://localhost:${PORT_API}`
        }
        if(env == "prod"){
            cs.api_url = `api prod`
        }
        this.setState(cs);
    },
    handleRouteGo(path: string){
        const ds = this.getDeployStatus();
        if(ds){
            Router.go("/test"+path)
        }
        if(!ds){
            Router.go(path)
        }
    }
};

export const state = {
    data:{
        location: {
            longitude: 0,
            latitude: 0
        },
        internalData:{
            petIdToSearch: 0,
        },
        petInfo: {
            id: 0,
            nombre: "",
            found: false,
            petNameUbi: "",
            location: {},
            user_id: 0,
            imagen: ""
        },
        session:{
            isLogged: false,
            token: "",
            userId: 0
        },
        userData:{
            nombre: "",
            id: 0,
            email: ""
        }
    },
    listeners: [],  
    getState(){
        return this.data;
    },
    setState(newState){
        const cs = this.getState();
        this.data = newState;
        for(var cb of this.listeners){
          cb(cs);
        }
        console.log("State actualizado: ", newState)
    },
    subscribe(callback: (any) => any) {
        // recibe callbacks para ser avisados posteriormente
        this.listeners.push(callback);
    },
    setUserLocation(newLoc){
        const cs = this.getState();
        cs.location = newLoc;
        this.setState(cs)
    },
    setPetIdToSearch(id: number){
        const cs = this.getState();
        cs.internalData.petIdToSearch = id;
        this.setState(cs)
    },
    setLoggedStatus(newStatus: boolean){
        const cs = this.getState();
        cs.session.isLogged = newStatus;
        this.setState(cs)
    },
    setToken(token: string){
        const cs = this.getState();
        cs.session.token = token;
        this.setState(cs)
    },
    checkLoggedStatus(){
        const cs = this.getState();
        return cs.session.isLogged ? true : false;
    },
    setPetInfo(newPetInfo: Pet){
        const cs = this.getState();
        cs.petInfo = newPetInfo;
        this.setState(cs)
    },
    setUserMail(email: string){
        const cs = this.getState();
        cs.userData.email = email;
        this.setState(cs)
    },
    setUserId(id: number){
        const cs = this.getState();
        cs.sesion.userId = id;
        this.setState(cs)
    },
    setUserData(data){
        const cs = this.getState();
        cs.userData = data
        this.setState(cs)
    },
    checkPetInfo(){
        const cs = this.getState().petInfo;
        let nombre = false;
        let petNameUbi = false;
        // Normalizar que la ubicacion en DB tenga también un texto descriptivo para que la card lo levante. 


    },
    // LOGIN METHODS
    async authUser(userData){
        const email = userData.email;
        const password = userData.password;
        const API_URL = deployState.data.api_url;

        await fetch(API_URL+"/auth", {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(async (res)=>{
            if(res.status == 200){
                this.setLoggedStatus(true)
                this.setUserMail(email)
            }
            else if(res.status == 500){
                this.setLoggedStatus(false)
            }
        })
    },
    async getUserData(email: string){
        const API_URL = deployState.data.api_url;
        return await fetch(API_URL+"/user/by?email="+email,{
            mode: "cors",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((res)=>{
            if(res.status == 200){
                return res.json()
            }
            else if(res.status == 404){
                throw "Error de validacion, email incorrecto"
            }
        })
        .then((data)=>{
            return data
        })
    },
    
    // PETS
    async getPetsLost(){
        const API_URL = deployState.data.api_url;
        return await fetch(API_URL+"/pets", {
            mode: "cors",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((res) => {
            return res.json()
        })
        .then((data)=>{
            return data
        })
    },
    async getPetData(){
        const cs = this.getState();
        const API_URL = deployState.data.api_url;
        return await fetch(API_URL+"/pets/"+cs.internalData.petIdToSearch, {
            mode: "cors",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((res) => {
            return res.json()
        })
        .then((data)=>{
            console.log(data)
            this.setPetInfo(data)
            return data
        })
    },
    async getUserReports(){
        const cs = this.getState();
        const API_URL = deployState.data.api_url;
        const userData = cs.userData;

        console.log(userData.id)

        return await fetch(API_URL+"/petsByUser/"+userData.id,{
            mode: "cors",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((res)=>{
            return res.json()
        })
        .then((data)=>{
            console.log("EP GET USER REPORTS", data)
            return data
        })

    },
    async uploadPicture(path){
        
    }
}