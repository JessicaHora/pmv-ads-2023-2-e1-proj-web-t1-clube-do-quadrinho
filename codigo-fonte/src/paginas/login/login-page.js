btnLogin = document.getElementById("btnLogin");
btnLogin.addEventListener("click", (event) => {
  entrar(event);
});

var entrar = (event) => {
  event.preventDefault();
  email = document.getElementById("email").value;
  senha = document.getElementById("password").value;

  usuario = buscarUsuarioPorEmail(email);

  if (usuario !== undefined) {
    usuario.senha = descriptografar(usuario.senha);
    if (senha === usuario.senha) {
      usuario.senha = criptografar(usuario.senha);
      sessionStorage.setItem("usuario", JSON.stringify(usuario));
      window.location.href = "../paginaQuadrinho/quadrinho.html"
    } else {
      document.getElementById("error").classList.remove("inactive");
    }
  } else {
    document.getElementById("error").classList.remove("inactive");
  }
};
