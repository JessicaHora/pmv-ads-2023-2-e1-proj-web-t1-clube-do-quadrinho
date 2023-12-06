import { logout } from "../../services/account-service/account-service.js"
import { env } from "../../env.js";

document.getElementById("sair").addEventListener("click", () => {
    logout();
    window.location.replace(`${env.baseUrl}/paginas/login/login-page.html`);
});