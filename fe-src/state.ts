import { Router } from "@vaadin/router";
import { Pet } from "./lib/types";

const PORT_API = 3015;

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

type State = {
    data:{
        location: {
            longitude: number,
            latitude: number
        },
        internalData:{
            petIdToSearch: number,
        },
        petInfo: {
            id: number,
            nombre: string,
            found: Boolean,
            petNameUbi: string,
            location: Object,
            user_id: number,
            imagenUrl: string,
            imagenCode: string
        },
        session:{
            isLogged: Boolean,
            token: string,
            userId: number
        },
        userData:{
            nombre: string,
            id: number,
            email: string
        }
    }
}

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
            imagenUrl: "",
            imagenCode: ""
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
        cs.userData.id = id;
        this.setState(cs)
    },
    setUserData(data){
        const cs = this.getState();
        cs.userData = data
        this.setState(cs)
    },
    setPetName(name){
        const cs = this.getState();
        cs.petInfo.nombre = name;
        this.setState(cs);
    },
    checkPetInfo(){
        const petInfo = this.getState().petInfo;
        const currentState = this.getState();
        let nombre = false;
        let petNameUbi = false;
        let petLocation = false;
        let imagenCode = false;
        let userId = false;
        // Normalizar que la ubicacion en DB tenga también un texto descriptivo para que la card lo levante. 
        if(petInfo.nombre.length != 0){
            nombre = true
        }
        if(petInfo.petNameUbi.length != 0){
            petNameUbi = true
        }
        if(Object.keys(petInfo.location).length != 0){
            petLocation = true
        }
        if(petInfo.imagenCode.length != 0){
            imagenCode = true
        }
        if(currentState.userData.id != 0){
            userId = true
        }

        if(nombre && petNameUbi && petLocation && imagenCode && userId){
            return true
        }else{
            return false
        }

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
                const userData = await this.getUserData(email);
                this.setUserId(userData.id)
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
        
    },
    async createNewReport(){
        /* nombre: data.nombre,
        found: data.found,
        location: data.location,
        user_id: userId,
        imagenCode: data.imagenCode */
        const cs = this.getState();
        const API_URL = deployState.data.api_url;
        const userData = cs.userData;
        const petData = cs.petInfo

        return await fetch(API_URL+"/pets", {
            mode: "cors",
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre: petData.nombre,
                found: false,
                location: {
                    lat: petData.location.lat,
                    lng: petData.location.lng
                },
                user_id: userData.id,
                imagen: petData.imagenCode,
                locationName: petData.locationName
            })
        })
        .then((res)=>{
            if(res.status == 200){
                console.log("ok")
            }
            else if(res.status == 500){
                console.log("not ok")
            }
        })
    },
    setReportData(newState){

    },
    async sendReportAlert(){

    }
}