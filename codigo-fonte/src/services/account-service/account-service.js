import { criptografar } from "../criptografy-service/criptografy-service.js";

function cadastrarUsuario(username, email, senha) {
  var senha = criptografar(senha);
  // Recuperar os usuários existentes do localStorage (se houver)
  var usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
  // Criar um novo objeto de usuário
  var novoUsuario = {
    id: usuarios.length + 1,
    username: username,
    email: email,
    senha: senha,
    quadrinhos: {
      lido: [],
      lendo: [],
      queroLer: [],
    },
    listas: []
  };
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

function usuarioLogado() {
  var usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  return usuario;
}

function logout() {
  localStorage.removeItem("usuarioLogado");
}

export {
  cadastrarUsuario,
  buscarTodosUsuarios,
  buscarUsuarioPorNome,
  buscarUsuarioPorEmail,
  usuarioLogado,
  logout,
};
