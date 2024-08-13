import { state } from "../../state";

class Cliente extends HTMLElement{
    shadow = this.attachShadow({mode: "open"});
    constructor(){
        super();
    }
    async connectedCallback(){
        // Se va a ejecutar cuando se corra la /page
    }
    render(){
        const div = document.createElement("div");
        const style = document.createElement("style");

        div.innerHTML = `

        `
        
        style.textContent = `
            
        `

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("cliente-page", Cliente);