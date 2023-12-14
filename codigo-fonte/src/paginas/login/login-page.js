import { buscarUsuarioPorEmail } from "../../services/account-service/account-service.js";
import { criptografar, descriptografar } from "../../services/criptografy-service/criptografy-service.js";

var btnLogin = document.getElementById("btnLogin");
btnLogin.addEventListener("click", (event) => {
  entrar(event);
});

var entrar = (event) => {
  event.preventDefault();
  var email = document.getElementById("email").value;
  var senha = document.getElementById("password").value;
  var usuario = JSON.parse(localStorage.getItem(`usuario-${email}`));
  if (!usuario) {
    usuario = buscarUsuarioPorEmail(email);
  }

  if (usuario !== undefined) {
    usuario.senha = descriptografar(usuario.senha);
    if (senha === usuario.senha) {
      usuario.senha = criptografar(usuario.senha);

      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
      localStorage.setItem(`usuario-${email}`, JSON.stringify(usuario));
      window.location.href = "../Homepage/Homepage.html"
    } else {
      document.getElementById("error").classList.remove("inactive");
    }
  } else {
    document.getElementById("error").classList.remove("inactive");
  }
}
