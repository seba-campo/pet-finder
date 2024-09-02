// import { state } from "../../state";

class ReportForm extends HTMLElement{
    shadow = this.attachShadow({mode: "open"});
    constructor(){
        super();
        this.render()
    }
    async connectedCallback(){
    }
    render(){
        const div = document.createElement("div");
        const toggleOnOff = this.getAttribute("toggle")
        const style = document.createElement("style");
        const idToReport = this.getAttribute("id-pet");
        const petName = this.getAttribute("name-pet");


        div.innerHTML = /*html*/`
            <div class="form-container">
                <div class="form-close"><p>x</p></div>

                <div class="form-title">
                    <p>Reportar info de ${petName}, id ${idToReport}</p>
                </div>

                <div class="form-input">
                    <label class="input-label" for="name">Nombre</label>
                    <input type="text" name="name">
                </div>
                <div class="form-input">
                    <label class="input-label" for="telefono">Teléfono</label>
                    <input type="text" name="telefono">
                </div>
                <div class="form-input">
                    <label class="input-label" for="information">¿Dónde lo viste?</label>
                    <input type="text" id="information" name="information">
                </div>

                <div class="form-send">
                        <p>Enviar información</p>
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
                height: 603px;
                width: 314px;
            }
        `

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("report-form", ReportForm);