import { usuarioLogado } from "./services/account-service/account-service.js";

(() => {
  if (!usuarioLogado()) window.location.href = "paginas/login/login-page.html";
  else window.location.href = "paginas/paginaQuadrinho/quadrinho.html";
})();
