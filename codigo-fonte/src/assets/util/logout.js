import { logout } from "../../services/account-service/account-service.js"

document.getElementById("sair").addEventListener("click", () => {
    logout();
    window.location.replace(`${window.location.origin}/codigo-fonte/src/paginas/login/login-page.html`);
});