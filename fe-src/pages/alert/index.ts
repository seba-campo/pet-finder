import { state, deployState } from "../../state";
import { Router } from "@vaadin/router";

class Alert extends HTMLElement{
    shadow = this.attachShadow({mode: "open"});
    constructor(){
        super();
        const cs = state.getState()
        const petId = cs.internalData.petIdToSearch
        this.search = petId;
        const petNombre = cs.petInfo.nombre
        this.nombre = petNombre
        this.render()
    }
    async connectedCallback(){
        // TODO: logica de GET info mascota

    }
    search : string = ""
    nombre: string = ""
    render(){
        const div = document.createElement("div");
        const style = document.createElement("style");


        div.innerHTML = /*html*/`   
            <navbar-component></navbar-component>
            <div class="form-container">
                <div class="form-title">
                    <p>Reportar info de ${this.nombre}</p>
                </div>

                <div class="form-input">
                    <label class="input-label" for="name">Nombre</label>
                    <input class="inputs" type="text" name="name">
                </div>
                <div class="form-input">
                    <label class="input-label" for="telefono">Teléfono</label>
                    <input class="inputs" type="text" name="telefono">
                </div>
                <div class="form-input">
                    <label class="input-label" for="information">¿Dónde lo viste?</label>
                    <textarea class="inputs" rows="6" cols="50" type="textarea" id="information" name="information"></textarea>
                </div>

                <div class="buttons-div">
                    <custom-button class="buttons" color="green">Enviar informacion</custom-button>
                    <custom-button class="buttons volver" color="black">Volver</custom-button>
                </div>
            </div>
        `
        
        style.textContent = /*css*/`
            .form-container{
                display: flex;
                flex-direction: column;
                align-items: center; 
                justify-content: center; 
                background-color: #26302E;
                height: calc(100vh - 60px);
                width: 100%;
                /* margin-bottom: 15px; */
            }
            
            .form-title{
                font-family: "Poppins", "sans-serif";
                width: 300px;
                font-size: 36px;
                font-weight: 700;
                line-height: 54px;
                text-align: center;
                color: white;
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
                color: white;
                align-self: flex-start
            }

            .inputs{
                width: 320px;
                height: 35px;
                background-color: #4a5553;
                color: white;
                border: 0;
                font-size: 20px;
                margin: 6px 0;
            }

            #information{
                height: 70px;
                font-size: 18px;
                margin-bottom: 15px;
            }

            .buttons-div{
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            .buttons{
                margin: 5px 0;
            }
        `

        const volverCta = div.querySelector(".volver") as HTMLElement;
        volverCta.addEventListener("click", ()=>{
            deployState.handleRouteGo("/feed")
        })

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("pet-alert", Alert);