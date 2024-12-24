import { deployState, state } from "../../state";

class Cliente extends HTMLElement{
    shadow = this.attachShadow({mode: "open"});
    constructor(){
        super();
        this.render()
    }
    async connectedCallback(){
        // Se va a ejecutar cuando se corra la /page
    }
    render(){
        const div = document.createElement("div");
        const style = document.createElement("style");

        div.innerHTML = /*html*/`
            <div class="root">
                <navbar-component></navbar-component>
                <div class="main-container">
                    <div class="main__hero">
                        <p class="main__hero-p">Mis reportes</p>
                    </div>
                    
                    <div class="main__feed-pets">
                        <loading-element class="loading-element"></loading-element>
                        <div class="feed">
                        </div>
                    </div>

                    <div class="buttons-div">
                        <custom-button color="blue" class="main__get-location-btn">Reportar una mascota</custom-button>
                    </div>
                </div>
            </div>
        `
        
        style.textContent = /*css*/`
            .main-container{
                background: linear-gradient(191.08deg, #FFFFFF 8.17%, #DEF4F0 62.61%);
                min-height: calc(100vh - 60px);
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
            }

            .logo-img{
                /* width: 190px; */
            }

            .main__hero-p{
                font-size: 36px;
                font-weight: 700;
                align: center;
                font-family: "Poppins", "sans-serif";
                text-align: center;
                color: #EB6372;
                margin: 0;
            }

            .main__subt-p{
                font-family: "Poppins", "sans-serif";
                font-size: 24px;
                font-weight: 400;
                line-height: 36px;
                text-align: center;
                margin: 0;
                max-width: 70vw;
            }

            .feed{
                display: none;
                transition: 0.3s ease-in-out;
                height: calc(100vh - 60px);
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
            }

            .buttons-div{
                height: 140px;
                display: flex; 
                justify-content: space-evenly;
                flex-direction: column;
                margin-bottom: 30px;
            }
        `

        const loadingElement = div.querySelector(".loading-element") as HTMLElement;
        const feedEl = div.querySelector(".feed") as HTMLElement;
        // Chekeo si está logueado
        if(state.checkLoggedStatus()){
            const userMail = state.getState().userData.email;
            state.getUserData(userMail)
            .then((data)=>{
                state.setUserData(data)
                state.getUserReports().then((pets)=>{
                    for(let p of pets){
                        feedEl.innerHTML += `<pet-card title="${p.nombre}" img="${p.imagen}"location="${p.locationName}" pet-id="${p.id}"></pet-card>`
                    }
                    
                    loadingElement.style.display = "none";
                    feedEl.style.display = "flex"
                })
            })
            
        }
        else{
            deployState.handleRouteGo("/")
        }

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("cliente-page", Cliente);