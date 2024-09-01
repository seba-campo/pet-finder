// import { state } from "../../state";

class Card extends HTMLElement{
    shadow = this.attachShadow({mode: "open"});
    constructor(){
        super();
        this.render()
    }
    async connectedCallback(){
    }
    render(){
        const div = document.createElement("div");
        const style = document.createElement("style");

        div.innerHTML = /*html*/`
            <div class="loader-container">
                <div class="bouncing-dots">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>
        `
        
        style.textContent = /*css*/`

        `

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("card-pet", Card);