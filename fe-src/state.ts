export const state = {
    data:{
        location: {
            longitude: 0,
            latitude: 0
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
}