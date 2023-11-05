import { logout } from "../../services/account-service/account-service.js"

document.getElementById("sair").addEventListener("click", () => {
    logout();
    window.location.href = "../login/login-page.html";
});