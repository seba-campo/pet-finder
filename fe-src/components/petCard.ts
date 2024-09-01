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
        const imageSrc = this.getAttribute("img");
        const petName = this.getAttribute("title");
        const petLocation = this.getAttribute("location");


        div.innerHTML = /*html*/`
            <div class="card-container">
                <div class="card-image">
                    <img class="img" src="${imageSrc}">
                </div>
                <div class="card-info">
                    <div class="info-block">
                        <p class="info-name">${petName}</p>
                        <p class="info-location">${petLocation}</p>
                    </div>
                    <div class="info-button">

                    </div>
                </div>
            </div>
        `
        
        style.textContent = /*css*/`
            .card-container{
                background-color: #26302E;
                border-radius: 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                color: white;
                height: 234px;
                width: 335px;
            }

            .card-info{
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .card-image{
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 5px;
            }

            .img{
                width: 320px;
                height: 136px;
            }

            .info-name{
                margin: 0 10px;
                font-family: "Roboto", "sans-serif";
                font-size: 36px;
                font-weight: 700;
                line-height: 54px;
                text-align: left;
            }

            .info-location{
                margin: 10px 10px;
                font-family: "Roboto", "sans-serif";
                font-size: 16px;
                font-weight: 700;
                line-height: 18.75px;
                text-align: left;
            }
        `

        div.appendChild(style)
        this.shadow.appendChild(div);
    }
}

customElements.define("pet-card", Card);