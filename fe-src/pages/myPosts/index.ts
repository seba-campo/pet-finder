import { state } from "../../state";

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
        const homeLogo = require("../../img/homelogo.png")

        div.innerHTML = /*html*/`
            <div class="root">
                <navbar-component></navbar-component>
                <div class="main-container">
                    <div class="main__hero">
                        <p class="main__hero-p">Mis mascotas reportadas</p>
                        <p class="main__subt-p">Encontrá y reportá mascotas perdidas cerca de tu ubicación</p>
                    </div>

                    <div class="buttons-div">
                        <custom-button color="blue" class="main__get-location-btn">Dar mi ubicacion actual</custom-button>
                        <custom-button color="green">¿Como funciona Pet Finder?</custom-button>
                    </div>
                </div>
            </div>
        `
        
        style.textContent = /*css*/`
            .main-container{
                background: linear-gradient(191.08deg, #FFFFFF 8.17%, #DEF4F0 62.61%);
                height: calc(100vh - 60px);
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

            .buttons-div{
                height: 140px;
                display: flex; 
                justify-content: space-evenly;
                flex-direction: column;
            }
        `

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("cliente-page", Cliente);