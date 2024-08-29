import { state } from "../../state";

class Home extends HTMLElement{
    shadow = this.attachShadow({mode: "open"});
    constructor(){
        super();
        this.render();
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
                    <div class="logo">
                        <img src="" alt="">
                    </div>

                    <div>
                        <p>Pet Finder App</p>
                    </div>

                    <div>
                        <p>Encontrá y reportá mascotas perdidas cerca de tu ubicación</p>
                    </div>

                    <div class="buttons-div">
                        <custom-button color="blue">Dar mi ubicacion actual</custom-button>
                        <custom-button color="green">¿Como funciona Pet Finder?</custom-button>
                    </div>

                </div>

            </div>
        `
        
        style.textContent = `
            
        `

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("home-page", Home);