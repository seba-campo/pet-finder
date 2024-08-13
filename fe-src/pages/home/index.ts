import { state } from "../../state";

class Home extends HTMLElement{
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

        div.innerHTML = /*html*/`
            <div class="root">
                <navbar-component></navbar-component>
            </div>
        `
        
        style.textContent = `
            
        `

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("home-page", Home);