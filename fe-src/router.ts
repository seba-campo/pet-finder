import { Router } from "@vaadin/router";
import { deployState } from "./state.ts";
// import { initializeApp } from "./state";


window.addEventListener("load", () => {
  const router = new Router(document.querySelector(".root-container"));

   // Check if is deployed...
   const actualUrl = window.location.origin;
   if(actualUrl.startsWith("https://pet-finder-pzu3.onrender.com")){
     deployState.setDeployedStatus(true)
     deployState.setApiUrl("prod")
   }
   if(actualUrl.startsWith("http://localhost")){
     console.log("Dev-mode active")  
     deployState.setDeployedStatus(false)
     deployState.setApiUrl("dev")
   }
   
  console.log(deployState.getDeployStatus())

  const currentDeploy = deployState.getDeployStatus();
  // prod
  if(currentDeploy){
    router.setRoutes([
      { path: "/", component: "home-page" },
      { path: "/feed", component: "feed-page"},
      { path: "/alert", component: "pet-alert"},
      { path: "/auth", component: "login-page"},
      { path: "/auth/register", component: "register-page"},
      { path: "/my-reports", component: "cliente-page"},
      { path: "/create-report", component: "createreport-page"}
    ]);
  }
  // dev
  if(!currentDeploy){
    router.setRoutes([
      { path: "/", component: "home-page" },
      { path: "/feed", component: "feed-page"},
      { path: "/alert", component: "pet-alert"},
      { path: "/auth", component: "login-page"},
      { path: "/auth/register", component: "register-page"},
      { path: "/my-reports", component: "cliente-page"},
      { path: "/create-report", component: "createreport-page"}
    ]);
  }
});