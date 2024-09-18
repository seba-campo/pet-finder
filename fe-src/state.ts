export const state = {
    data:{
        location: {
            longitude: 0,
            latitude: 0
        },
        internalData:{
            petIdToSearch: ""
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
    setPetIdToSearch(id: string){
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
    }
}