// import { state } from "../../state";

class Navbar extends HTMLElement{
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
        const divHamburgerDeployed = document.createElement("div");
        const styleHamburgerDeployed = document.createElement("style");

        div.innerHTML = /*html*/`
            <div class="root">
                <div class="navbar">
                    <div class="navbar-icon"></div>
                    <div class="navbar-hamburguer">1</div>
                </div>
            </div>
        `
        
        style.textContent = /*css*/`
            .root{

            }

            .navbar{
                background-color: #26302E;
                display: flex;
                justify-content: space-between;
                height: 60px;
                width: 100%;
                align-items: center;
            }

            .navbar-icon{
                width: 30px;
                height: 30px;
                background-color: #fefefe;
                border-radius: 50%;
                margin: 0 15px;
            }
            
            .navbar-hamburguer{
                width: 30px;
                height: 30px;
                background-color: #fefefe;
                border-radius: 50%;
                margin: 0 15px;
            }
        `

        divHamburgerDeployed.innerHTML = /*html*/`
            <div class="root">

            </div>
        `

        styleHamburgerDeployed.innerText = /*css*/`
            .root{
                width: 100vw;
                height: 80vh;
                background-color: #26302E;

            }
        `


        const hamburguerEl = div.querySelector(".navbar-hamburguer");
        hamburguerEl?.addEventListener("click", ()=>{
            // sacar div anterior
            this.shadow.removeChild(div)
            //presentar nuevo div y stilos
            divHamburgerDeployed.appendChild(styleHamburgerDeployed)
            this.shadow.appendChild(divHamburgerDeployed)
        })

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("navbar-component", Navbar);