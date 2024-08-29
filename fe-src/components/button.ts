// import { state } from "../../state";

class CustomButton extends HTMLElement{
    shadow = this.attachShadow({mode: "open"});
    constructor(){
        super();
    }
    async connectedCallback(){
        const color = this.getAttribute("color");
        

        switch(color){
            case "blue":
                this.color = "#5A8FEC"
                break
            case "green":
                this.color = "#00A884"
                break
            case "red":
                this.color = "#EB6372"
                break
            case "black":
                this.color = "#4A5553"
                break
        }

        this.render();
    }
    color: string
    render(){
        const div = document.createElement("div");
        const style = document.createElement("style");

        console.log(this.color)
        console.log(this.textContent)

        div.innerHTML = /*html*/`
            <div class="root">
                <p>${this.textContent}</p>
            </div>
        `
        
        style.textContent = /*css*/`
            .root{
                display: flex;
                justify-content: center;
                align-items: center;
                width: 335px;
                height: 50px;
                border-radius: 4px;
                color: #FFFFFF;
                font-family: "Roboto", sans-serif;
                font-size: 16px;
                font-weight: 700;
                background-color: ${this.color}
            }
        `

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("custom-button", CustomButton);