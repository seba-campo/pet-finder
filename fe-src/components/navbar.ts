import { state, deployState } from "../state";
import { Router } from "@vaadin/router";

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
                    <div class="option-div" id="inicio">
                        <p>Inicio</p>
                    </div>
                    <div class="option-div" id="mis-datos">
                        <p>Mis datos</p>
                    </div>
                    <div class="option-div" id="mis-reportes">
                        <p>Mis mascotas reportadas</p>
                    </div>
                    <div class="option-div" id="reportar">
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
                position: absolute; 
                z-index: 1;
                top: 0;
                width: 100vw;
                height: 80vh;
                background-color: #26302E;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
                font-family: "Poppins", sans-serif;
                font-weight: 700;
            }

            .option-div{
                margin-left: 10px;
            }

            .menu-container{
                color: #EEEEEE;
                font-size: 24px;
                text-align:flex-start;
                height: 300px;
                display: flex; 
                justify-content: space-evenly;
                flex-direction: column;
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
                margin: 7px 25px;
            }

            .menu-sesion-info{
                align-self: center;
                text-align: center;
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
            // Chekeo la sesion al abrir el burguer
            const userLogged = state.checkLoggedStatus();


            // sacar div anterior
            this.shadow.removeChild(div)
            //presentar nuevo div y stilos
            divHamburgerDeployed.appendChild(styleHamburgerDeployed)
            this.shadow.appendChild(divHamburgerDeployed)

            const inicioCtaEl = divHamburgerDeployed.querySelector("#inicio") as HTMLElement;
            inicioCtaEl.addEventListener("click", ()=>{
                deployState.handleRouteGo("/")
            })

            const misReportesEl = divHamburgerDeployed.querySelector("#mis-reportes") as HTMLElement;
            misReportesEl.addEventListener("click", ()=>{
                userLogged ? deployState.handleRouteGo("/my-reports") : deployState.handleRouteGo("/auth")
            })

            const misDatosEl = divHamburgerDeployed.querySelector("#mis-datos") as HTMLElement;
            misDatosEl.addEventListener("click", ()=>{
                userLogged ? deployState.handleRouteGo("/feed") : deployState.handleRouteGo("/auth")
            })

            const reportarEl = divHamburgerDeployed.querySelector("#reportar") as HTMLElement;
            reportarEl.addEventListener("click", ()=>{
                userLogged ? deployState.handleRouteGo("/create-report") : deployState.handleRouteGo("/auth")
            })

            const cerrarSesionEl = divHamburgerDeployed.querySelector(".menu-cerrar-sesion") as HTMLElement;
            cerrarSesionEl.addEventListener("click", ()=>{
                if(userLogged){
                    state.setLoggedStatus(false);
                    deployState.handleRouteGo("/")
                }
                else{
                    console.log("No estas logeado :)"); 
                }
                    
            })
        })


        const menuCloseEl = divHamburgerDeployed.querySelector(".menu-x");
        menuCloseEl?.addEventListener("click", ()=>{
            // sacar div anterior
            this.shadow.removeChild(divHamburgerDeployed)
            //presentar nuevo div y estilos
            div.appendChild(style)
            this.shadow.appendChild(div)
        })

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("navbar-component", Navbar);

// TODO: si se clicka afuera cerrar el menu desplegable
// ahora solo se cierra con la X