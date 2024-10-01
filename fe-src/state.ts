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
            location: {},
            user_id: 0,
            imagen: ""
        },
        session:{
            isLogged: false,
            token: ""
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
    // LOGIN METHODS
    async authUser(userData){
        const email = userData.email;
        const password = userData.password;
        const API_URL = deployState.data.api_url;

        await fetch(API_URL + "/auth", {
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
        .then((res)=>{
            if(res.status == 200){
                this.setLoggedStatus(true)
                return "logged"
            }
            else if(res.status == 500){
                this.setLoggedStatus(false)
                throw "error"
            }
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
    }
}