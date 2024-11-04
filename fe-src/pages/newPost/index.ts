import { state } from "../../state";
import mapboxgl from 'mapbox-gl';
import Dropzone from "dropzone";


mapboxgl.accessToken = process.env.MAPBOX_TOKEN as any;
let map;

class NewReport extends HTMLElement{
    shadow = this.attachShadow({mode: "open"});
    constructor(){
        super();
        this.render();
        this.initMap();
        this.myFunctionDropzone();
    }
    async connectedCallback(){
        // Se va a ejecutar cuando se corra la /page
    }
    initMap(){
        const mapContainer = this.shadow.querySelector(".map-div") as any
        map = new mapboxgl.Map({
          container: mapContainer, // container ID
          style: "mapbox://styles/mapbox/streets-v12",
          center: [-58.381775, -34.603851], // Coordenadas del Obelisco en Buenos Aires long-lat
          zoom: 6,
          maxBounds: [
            [-75, -55], // Esquina suroeste de Argentina
            [-53, -20], // Esquina noreste de Argentina
          ],
           // starting zoom
        });
    }
    initSearchForm(query: string) {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.MAPBOX_TOKEN}`
      )
        .then((resp) => resp.json())
        .then((data) => {
          const [longitude, latitude] = data.features[0].center;
          const placeName = data.features[0].place_name;
          const currentState = state.getState();
          const nameUbicacionPet = placeName.split(" ").slice(0, 4).join(" ");
          const nameUbicacion = nameUbicacionPet.split(",").join("");
          currentState.petInfo.petNameUbi = nameUbicacion;
          state.setState(currentState);
          map.flyTo({ center: [longitude, latitude], zoom: 15 });
          map.on("click", (e) => {
            const { lng, lat } = e.lngLat;
            console.log(lng, lat);
            console.log(e);
            currentState.petInfo.location.lng = lng;
            currentState.petInfo.location.lat = lat;
            state.setState(currentState);
            // Eliminar marcadores existentes (si los hay)
            if (map.getLayer("marker")) {
              map.removeLayer("marker");
              map.removeSource("marker");
            }
            // Agregar marcador en la ubicación seleccionada
            map.addSource("marker", {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: [
                  {
                    type: "Feature",
                    geometry: {
                      type: "Point",
                      coordinates: [lng, lat],
                    },
                  },
                ],
              },
            });
  
            map.addLayer({
              id: "marker",
              type: "symbol",
              source: "marker",
              layout: {
                "icon-image": "marker", // Cambia esto por el icono que desees
                "icon-size": 1.5,
        
              },
            });
          });
        })
        .catch((error) => {
          console.error("Error al realizar la búsqueda:", error);
        });
    }
    buscarDir() {
      const btnBuscar = this.shadow.querySelector("#buscar-loc") as HTMLFormElement;
  
      btnBuscar.addEventListener("click", (e) => {
        const localidadInput = this.shadow.querySelector("#localidad") as HTMLInputElement;
        const query = localidadInput.value;
        console.log(query)
        if (query.trim() !== "") {
          this.initSearchForm(query);
        }
      });
    }
    myFunctionDropzone() {
      const imgDropzone = this.shadow.querySelector(".dropzone") as HTMLImageElement;
      let imageURL;
  
      const myDropzone = new Dropzone(imgDropzone, {
        url: "/falsa",
        autoProcessQueue: false,
        maxFilesize: 2097152
      });
      myDropzone.on("thumbnail", function (file) {
        const imageText = file.dataURL;
        const currentState = state.getState();
        imageURL = imageText;
        imgDropzone.src = imageURL;
        currentState.petInfo.imagenCode = imageURL;
        // console.log(imageURL)
        state.setState(currentState);
        // Cargar la imagen debe ser en front para poder llevarla a la API
      });
      myDropzone.on("addedfile", function () {
        myDropzone.processQueue();
      });
    }
    render(){
        const div = document.createElement("div");
        const style = document.createElement("style");
        const imagePlaceholder = require("../../img/imageplaceholder.png");
        
        div.innerHTML = /*html*/`
            <div class="root">
                <navbar-component>
                </navbar-component>
                <div class="main-container">
                    <div class="main_logo">

                    <div class="main__hero">
                        <p class="main__subt-p">Reportá una mascota perdida</p>
                    </div>

                    <div class="form-input">
                        <label class="input-label" for="nombre">Nombre</label>
                        <input class="inputs" type="text" id="nombre" name="nombre">
                    </div>

                    <div class="form-image">
                      <img class="dropzone image-zone" src="https://res.cloudinary.com/dlhotzwpo/image/upload/v1730422559/b2bb50582f7f28d9d1ce6aface294522_x6tiqu.png" alt="">
                      <!-- <label class="input-label" for="nombre">Carga la foto de tu mascota</label> -->
                    </div>

                    <div class="form-map">
                        <div class="map-div">
                        </div>
                        <p class="map-legend">Buscá un punto de referencia para reportar la mascota. Por ejemplo, la ubicación donde lo viste por última vez.</p>
                        <label class="input-label" for="localidad">Localidad</label>
                        <input class="inputs" placeholder="Ej: Buenos Aires, Munro" type="text" id="localidad" name="localidad">
                        <custom-button color="blue" id="buscar-loc">Buscar localidad</custom-button>
                    </div>

                    <div class="buttons-div send-btn">
                         <custom-button color="green" class="submit">Reportar mascota</custom-button>
                         <custom-button color="black">Cancelar</custom-button>
                    </div>
                </div>
            </div>
        `
        
        style.textContent = /*css*/`
            .main-container{
              background: linear-gradient(191.08deg, #FFFFFF 8.17%, #DEF4F0 62.61%);
              /* height: calc(100vh - 60px); */
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              align-items: center;
            }

            .main_logo{
              display: flex;
              flex-direction: column;
              justify-content: space-evenly;
              align-items: center;
            }

            .form-input{
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-evenly;
              width: 325px;
            }

            .form-image{
              width: 80vw;
              /* height: 250px; */
              margin: 45px 0px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
            }

            .image-pet{
              width: 335px;
              height: 180px;
              margin-bottom: 45px;
            }

            .form-map{
              width: 80vw;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              align-items: center;
            }

            .map-div{
              /* width:334px;
              height:253px; */
            }

            .mapboxgl-ctrl-bottom-right{
              display: none
            }

            .mapboxgl-map{
              /* width: 60vw; */
            }

            .map-legend{
              font-family: "Roboto", sans-serif;
              width: 80vw;
              font-size: 16px;
              font-weight: 400;
              line-height: 18.75px;
              text-align: center;
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

            .main__hero{
              height: 90px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 30px 0;
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
              align-items: center;
              height: 120px;
              margin: 25px 0;
            }

            .image-zone{
              width: 80vw;
            }
        `

        const searchLoc = div.querySelector("#buscar-loc") as HTMLElement;
        searchLoc.addEventListener("click", ()=>{
          this.buscarDir()
        })

        // Guardar el reporte completo
        const submitBtn = div.querySelector(".submit") as HTMLElement;
        submitBtn.addEventListener("click", ()=>{
          const petNameEl = div.querySelector("#nombre") as HTMLInputElement;
          state.setPetName(petNameEl.value)
          // Validar el state completo para subir. 
          if(state.checkPetInfo()){
            // console.log(state.getState().petInfo)
            state.createNewReport();
          }
          else{ 
            alert("Revisa los datos ingresados.")
          }

        })

        
        div.appendChild(style)
        this.shadow.appendChild(div);
    }
    
}

customElements.define("createreport-page", NewReport);