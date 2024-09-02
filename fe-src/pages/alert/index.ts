// import { state } from "../../state";
import { Router } from "@vaadin/router";

class Alert extends HTMLElement{
    shadow = this.attachShadow({mode: "open"});
    constructor(){
        super();
        this.connectedCallback();
        this.render()
    }
    async connectedCallback(){
        const params = document.location.search;
        this.search = params;
    }
    search : string = ""
    render(){
        const div = document.createElement("div");
        const style = document.createElement("style");

        div.innerHTML = /*html*/`
            <h1>${this.search}</h1>
        `
        
        style.textContent = /*css*/`

        `

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("pet-alert", Alert);