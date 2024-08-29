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
        const brandLogo = require("../img/brandlogo.png")

        div.innerHTML = /*html*/`
            <div class="root">
                <div class="navbar">
                    <div class="navbar-icon">
                        <img src="${brandLogo}" class="navbar-brandimage">
                    </div>
                    <div class="navbar-hamburguer">
                        <p>☰</p>
                    </div>
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
                border-radius: 0 0 5px 5px;
            }

            .navbar-icon{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                margin: 0 15px;
            }

            .navbar-brandimage{
                width: 30px;
            }
            
            .navbar-hamburguer{
                border-radius: 50%;
                margin: 0 15px;
            }

            .navbar-hamburguer p{
                font-size: 26px;
                color: #EEEEEE;
                margin: 0
            }
        `

        divHamburgerDeployed.innerHTML = /*html*/`
            <div class="root">
                <div class="menu-close">
                    <p class="menu-x">X</p>
                </div>

                <div class="menu-container">
                    <div>
                        <p>Mis datos</p>
                    </div>
                    <div>
                        <p>Mis mascotas reportadas</p>
                    </div>
                    <div>
                        <p>Reportar mascotas</p>
                    </div>
                </div>

                <div class="menu-sesion-info">
                    <div class="menu-user-mail">
                        <p>usermail.@gmail.com</p>
                    </div>
                    <div class="menu-cerrar-sesion">
                        <p>Cerrar sesion</p>
                    </div>
                </div>
            </div>
        `

        styleHamburgerDeployed.innerText = /*css*/`
            .root{
                width: 100vw;
                height: 80vh;
                background-color: #26302E;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                font-family: "Poppins", sans-serif;
                font-weight: 700;
            }

            .menu-container{
                color: #EEEEEE;
                font-size: 24px;
            }

            .menu-close{
                display: flex; 
                justify-content: flex-end;
                width: 100vw;
            }
            .menu-close p{
                color: #EEEEEE;
                font-size: 30px;
                font-weight: 200;
                margin: 10px 25px;
            }

            .menu-user-mail{
                font-family: "Poppins", sans-serif;
                font-weight: 400;
                font-size: 16px;
                color: #EEEEEE
            }

            .menu-cerrar-sesion{
                color: #3B97D3;
                font-family: "Roboto", sans-serif;
                font-weight: 500;
                font-size: 16px;
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

        const menuCloseEl = divHamburgerDeployed.querySelector(".menu-x");
            menuCloseEl?.addEventListener("click", ()=>{
            // sacar div anterior
            this.shadow.removeChild(divHamburgerDeployed)
            //presentar nuevo div y stilos
            div.appendChild(style)
            this.shadow.appendChild(div)
        })

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("navbar-component", Navbar);