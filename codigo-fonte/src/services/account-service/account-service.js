function cadastrarUsuario(username, email, senha) {
  senha = criptografar(senha);
  // Recuperar os usuários existentes do localStorage (se houver)
  var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  // Criar um novo objeto de usuário
  var novoUsuario = { username: username, email: email, senha: senha };
  // Adicionar o novo usuário ao array
  usuarios.push(novoUsuario);
  // Atualizar o localStorage com o novo array de usuários
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function buscarTodosUsuarios() {
  var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  return usuarios;
}

function buscarUsuarioPorNome(nome) {
  var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  return usuarios.find(function (usuario) {
    return usuario.nome === nome;
  });
}

function buscarUsuarioPorEmail(email) {
  var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  return usuarios.find(function (usuario) {
    return usuario.email === email;
  });
}
