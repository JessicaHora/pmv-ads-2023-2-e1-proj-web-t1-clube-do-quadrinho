import { cadastrarUsuario } from "../../services/account-service/account-service.js";

window.onload = () => {
  // dados do formulário
  var username = document.getElementById("username");
  var email = document.getElementById("email");
  var senha = document.getElementById("senha");
  var btnCadastrar = document.getElementById("btn-cadastrar");

  btnCadastrar.addEventListener("click", (event) => {
    cadastrarUsuario(username.value, email.value, senha.value);
    window.location.href = "../login/login-page.html"
  });
};
