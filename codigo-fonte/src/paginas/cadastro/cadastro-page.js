window.onload = () => {
  // dados do formulário
  username = document.getElementById("username");
  email = document.getElementById("email");
  senha = document.getElementById("senha");
  btnCadastrar = document.getElementById("btn-cadastrar");

  btnCadastrar.addEventListener("click", (event) => {
    cadastrarUsuario(username.value, email.value, senha.value);
  });
};
