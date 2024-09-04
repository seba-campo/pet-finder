import { Router } from "@vaadin/router";
// import { initializeApp } from "./state";

window.addEventListener("load", () => {
  const router = new Router(document.querySelector(".root-container"));

  router.setRoutes([
    { path: "/", component: "home-page" },
    { path: "/feed", component: "feed-page"},
    { path: "/alert", component: "pet-alert"},
    { path: "/auth", component: "login-page"},
    { path: "/auth/register", component: "register-page"} 
  ]);
//   initializeApp();
});