import { Router } from "@vaadin/router";
import { deployState } from "./state.ts";
// import { initializeApp } from "./state";


window.addEventListener("load", () => {
  const router = new Router(document.querySelector(".root-container"));

   // Check if is deployed...
   const actualUrl = window.location.origin;
   if(actualUrl.startsWith("https://seba-campo.github.io")){
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
      { path: "a/", component: "home-page" },
      { path: "a/feed", component: "feed-page"},
      { path: "a/alert", component: "pet-alert"},
      { path: "a/auth", component: "login-page"},
      { path: "a/auth/register", component: "register-page"} 
    ]);
  }
  // dev
  if(!currentDeploy){
    router.setRoutes([
      { path: "/", component: "home-page" },
      { path: "/feed", component: "feed-page"},
      { path: "/alert", component: "pet-alert"},
      { path: "/auth", component: "login-page"},
      { path: "/auth/register", component: "register-page"} 
    ]);
  }
});