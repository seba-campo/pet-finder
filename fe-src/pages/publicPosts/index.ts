import { state } from "../../state";

class Feed extends HTMLElement{
    shadow = this.attachShadow({mode: "open"});
    constructor(){
        super();
        this.render();
    }
    async connectedCallback(){
    }
    petsLostMock = [
        {   nombre: "Bobby 1",
            id: 15345,
            location: "Nuñez, Buenos Aires",
            imagen: "https://gf2.geo.gfsrv.net/cdn13/fcebc17998aa8a1215df1e9dfe13c3.jpg"
        },
        {   nombre: "Bobby 2",
            id: 26234,
            location: "Nuñez, Buenos Aires",
            imagen: "https://gf2.geo.gfsrv.net/cdn13/fcebc17998aa8a1215df1e9dfe13c3.jpg"
        },
        {   nombre: "Bobby 3",
            id: 32346,
            location: "Nuñez, Buenos Aires",
            imagen: "https://gf2.geo.gfsrv.net/cdn13/fcebc17998aa8a1215df1e9dfe13c3.jpg"
        },
        {   nombre: "Bobby 4",
            id: 464326, 
            location: "Nuñez, Buenos Aires",
            imagen: "https://gf2.geo.gfsrv.net/cdn13/fcebc17998aa8a1215df1e9dfe13c3.jpg"
        }
    ]
    render(){
        const div = document.createElement("div");
        const style = document.createElement("style");
        const homeLogo = require("../../img/homelogo.png")


        div.innerHTML = /*html*/`
            <div class="root">
                <navbar-component></navbar-component>
                <div class="main-container">
                    
                    <div class="main__title">
                        <p class="main__hero-p">Mascotas perdidas cerca</p>
                    </div>

                    <div class="main__feed-pets">
                        <loading-element class="loading-element"></loading-element>
                        <div class="feed">
                        </div>
                    </div>
                </div>
            </div>
        `
        
        style.textContent = /*css*/`
            .main__hero-p{
                    font-family: "Poppins", "sans-serif";
                    font-size: 24px;
                    font-weight: 700;
                    line-height: 36px;
                    text-align: center;
            }

            .main__feed-pets{
                background: linear-gradient(191.08deg, #FFFFFF 8.17%, #DEF4F0 62.61%);
                transition: 0.3s ease-in-out;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
            }

            .feed{
                display: none;
                transition: 0.3s ease-in-out;
                height: calc(100vh - 60px);
                flex-direction: column;
                justify-content: space-evenly;
                align-items: center;
            }

            .pet-card{
                margin: 10px 0;
            }
        `

        const loadingElement = div.querySelector(".loading-element") as HTMLElement;
        const feedEl = div.querySelector(".feed") as HTMLElement;
        
        state.getPetsLost().then((pets)=>{
            for(let p of pets){
                feedEl.innerHTML += `<pet-card class="pet-card" title="${p.nombre}" img="${p.imagen}"location="${p.locationName}" pet-id="${p.id}"></pet-card>`
            }
            
            loadingElement.style.display = "none";
            feedEl.style.display = "flex"
        })


        // setTimeout(async ()=>{

        //     console.log(await state.getPetsLost())

        // }, 3000)

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("feed-page", Feed);