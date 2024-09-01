// import { state } from "../../state";

class Loading extends HTMLElement{
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
            .loader-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: calc(100vh - 60px);
        }

        .bouncing-dots {
            display: flex;
            justify-content: space-between;
            width: 60px;
        }

        .dot {
            width: 15px;
            height: 15px;
            background-color: #FF5C35;
            border-radius: 50%;
            animation: bounce 1.5s infinite;
        }

        .dot:nth-child(1) {
            animation-delay: 0s;
        }

        .dot:nth-child(2) {
            animation-delay: 0.3s;
        }

        .dot:nth-child(3) {
            animation-delay: 0.6s;
        }

        @keyframes bounce {
            0%, 100% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-20px);
            }
        }
        `

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("loading-element", Loading);