import { state } from "../../state";

class Feed extends HTMLElement{
    shadow = this.attachShadow({mode: "open"});
    constructor(){
        super();
        this.render();
    }
    async connectedCallback(){
        // Se va a ejecutar cuando se corra la /page
    }
    petsLostMock = [
        {   nombre: "Bobby 1",
            location: "Nuñez, Buenos Aires",
            imagen: "https://img.freepik.com/free-photo/portrait-adorable-chihuahua-dog-smiling_23-2148460956.jpg?t=st=1725165572~exp=1725169172~hmac=a58fce498a7a9f4a08b8997ef4455ebc6eb44f98cdfcea0237506b5ff3db4a10&w=1060"
        },
        {   nombre: "Bobby 1",
            location: "Nuñez, Buenos Aires",
            imagen: "https://img.freepik.com/free-photo/portrait-adorable-chihuahua-dog-smiling_23-2148460956.jpg?t=st=1725165572~exp=1725169172~hmac=a58fce498a7a9f4a08b8997ef4455ebc6eb44f98cdfcea0237506b5ff3db4a10&w=1060"
        },
        {   nombre: "Bobby 1",
            location: "Nuñez, Buenos Aires",
            imagen: "https://img.freepik.com/free-photo/portrait-adorable-chihuahua-dog-smiling_23-2148460956.jpg?t=st=1725165572~exp=1725169172~hmac=a58fce498a7a9f4a08b8997ef4455ebc6eb44f98cdfcea0237506b5ff3db4a10&w=1060"
        },
        {   nombre: "Bobby 1",
            location: "Nuñez, Buenos Aires",
            imagen: "https://img.freepik.com/free-photo/portrait-adorable-chihuahua-dog-smiling_23-2148460956.jpg?t=st=1725165572~exp=1725169172~hmac=a58fce498a7a9f4a08b8997ef4455ebc6eb44f98cdfcea0237506b5ff3db4a10&w=1060"
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
                        <loading-element></loading-element>
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
                height: calc(100vh - 60px);
                transition: 0.3s ease-in-out;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
            }
        `

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("feed-page", Feed);