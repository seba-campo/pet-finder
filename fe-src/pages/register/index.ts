import { Router } from "@vaadin/router";
import { state } from "../../state";

class Register extends HTMLElement{
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
        const loginLogo = require("../../img/loginlogo.png")

        div.innerHTML = /*html*/`
            <div class="root">
                <navbar-component></navbar-component>
                <div class="main-container">
                    <div class="main_logo">
                        <img src="${loginLogo}" alt="" class="logo-img">
                    </div>

                    <div class="main__hero">
                        <p class="main__subt-p">Registrate</p>
                    </div>

                    <div class="form-input">
                        <label class="input-label" for="email">Email</label>
                        <input class="inputs" type="text" name="email">
                    </div>

                    <div class="form-input">
                        <label class="input-label" for="password">Contraseña</label>
                        <input class="inputs" type="password" name="pasword">
                    </div>

                    <div class="form-input">
                        <label class="input-label" for="password">Repetir Contraseña</label>
                        <input class="inputs" type="password" name="pasword">
                    </div>

                    <div class="buttons-div">
                        <custom-button color="blue">Registrarme</custom-button>
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
                width: 260px;
            }

            .form-input{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-evenly;
                width: 325px;
            }

            .input-label{
                font-family: "Poppins", "sans-serif";
                font-size: 16px;
                font-weight: 400;
                line-height: 24px;
                text-align: left;
                align-self: flex-start
            }

            .inputs{
                width: 320px;
                height: 35px;
                border: 0;
                font-size: 20px;
                margin: 6px 0;
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

            .footer{
                font-family: "Poppins", "sans-serif";
                font-size: 22px;
                font-weight: 400;
                line-height: 36px;
                text-align: center;
                margin: 0;
                max-width: 70vw;
            }

            .buttons-div{
                height: 80px;
                display: flex; 
                justify-content: space-evenly;
                flex-direction: column;
            }
        `

        // const registerCtaEl = div.querySelector(".register-span") as HTMLElement;
        // registerCtaEl.addEventListener("click", ()=>{
        //     console.log("Registrarse")
        // })
           

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("register-page", Register);