import { env } from "../../env.js";

function criptografar(texto) {
  let chave = env.encryptionKey;
  let resultado = "";
  for (let i = 0; i < texto.length; i++) {
    let char = texto.charCodeAt(i);
    let chaveChar = chave.charCodeAt(i % chave.length);
    let charCriptografado = char ^ chaveChar; // Operação XOR
    resultado += String.fromCharCode(charCriptografado);
  }
  return btoa(resultado); // Codifica para Base64 para fácil armazenamento
}

// Função para descriptografar uma string usando uma chave
function descriptografar(textoCriptografado) {
  let chave = env.encryptionKey;
  let texto = atob(textoCriptografado); // Decodifica a partir de Base64
  let resultado = "";
  for (let i = 0; i < texto.length; i++) {
    let char = texto.charCodeAt(i);
    let chaveChar = chave.charCodeAt(i % chave.length);
    let charOriginal = char ^ chaveChar; // Operação XOR
    resultado += String.fromCharCode(charOriginal);
  }
  return resultado;
}

export { criptografar, descriptografar };