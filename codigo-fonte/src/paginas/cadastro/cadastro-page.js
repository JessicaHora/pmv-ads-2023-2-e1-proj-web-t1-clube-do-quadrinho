import { cadastrarUsuario } from "../../services/account-service/account-service.js";

window.onload = () => {
  // dados do formulário
  var username = document.getElementById("username");
  var email = document.getElementById("email");
  var senha = document.getElementById("senha");
  var btnCadastrar = document.getElementById("btn-cadastrar");

  btnCadastrar.addEventListener("click", (event) => {
    event.preventDefault();
    if(username.value !== "" && email.value !== "" && senha.value !== ""){      
      cadastrarUsuario(username.value, email.value, senha.value);
      document.getElementById("success").classList.remove("inactive");
      document.getElementById("error").classList.add("inactive");
    } else {
      document.getElementById("error").classList.remove("inactive");
      document.getElementById("success").classList.add("inactive");
    }
  });
};
