import { Router } from "@vaadin/router";
import { state } from "../../state";

class Login extends HTMLElement{
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
                        <p class="main__subt-p">Ingresá a tu cuenta</p>
                    </div>

                    <div class="form-input">
                        <label class="input-label" for="email">Email</label>
                        <input class="inputs" type="text" id="email" name="email">
                    </div>

                    <div class="form-input">
                        <label class="input-label" for="password">Contraseña</label>
                        <input class="inputs" type="password" id="password" name="pasword">
                    </div>

                    <div class="buttons-div send-btn">
                        <custom-button color="blue" >Ingresar</custom-button>
                    </div>

                    <div class="">
                        <p class="footer">Aún no tenés una cuenta? <span class="register-span" style="color: #5A8FEC">Registrate</span></p>
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
                width: 290px;
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

        const submitBtn = div.querySelector(".send-btn") as HTMLElement;
        submitBtn.addEventListener("click", async ()=>{
            console.log("click")
            const userMail = div.querySelector("#email") as HTMLInputElement
            const userPassword = div.querySelector("#password") as HTMLInputElement
            const userData = {
                email: userMail.value,
                password: userPassword.value
            }
            
            console.log(await state.authUser(userData))
        })
        

        const registerCtaEl = div.querySelector(".register-span") as HTMLElement;
        registerCtaEl.addEventListener("click", ()=>{
            Router.go("/auth/register")
        })
           

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("login-page", Login);