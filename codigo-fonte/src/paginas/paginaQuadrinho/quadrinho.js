import {
  usuarioLogado,
  logout,
} from "../../services/account-service/account-service.js";
import * as comicsService from "../../services/comics-service/comics-service.js";

let linksId = document.querySelectorAll('a[href*="quadrinho.html?id="]');
let urlParams = new URLSearchParams(window.location.search);
let id = parseInt(urlParams.get("id"), 10);
let quadrinhoStatus = document.getElementById("adicionarQuadrinho");
let toastElement = document.querySelector('.toast');

document.getElementById("sair").addEventListener("click", () => {
    logout();
    window.location.href = "../login/login-page.html";
});

//renderizar página de quadrinho
function renderComicsPage(comic) {
  if (!usuarioLogado()) {
      document.head.querySelector('title').innerHTML = comic.title;
      document.getElementById('capa-quadrinho').src = comic.image;
      document.getElementById('titulo-quadrinho').innerHTML = comic.title;
      document.getElementById('criadores').innerHTML = comic.creators;
      document.getElementById('descricao').innerHTML = comic.description;
      document.getElementById('data').innerHTML = `Data de lançamento: ${comic.release_date}`
      document.getElementById('editora').innerHTML = `Editora: ${comic.publisher}`;
      let content = document.querySelector('.actionBox');
      content.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'h-100', 'bg-tertiary-light', 'text-center', 'body-small', 'p-2', 'rounded', 'mt-2');
  } else {
      document.getElementById('adicionarQuadrinho').classList.remove('d-none')
      document.getElementById('adicionarLista').classList.remove('d-none');
      document.getElementById('avaliarQuadrinho').classList.remove('d-none');
      document.head.querySelector('title').innerHTML = comic.title;
      document.getElementById('capa-quadrinho').src = comic.image;
      document.getElementById('titulo-quadrinho').innerHTML = comic.title;
      document.getElementById('criadores').innerHTML = comic.creators;
      document.getElementById('descricao').innerHTML = comic.description;
      document.getElementById('data').innerHTML = `Data de lançamento: ${comic.release_date}`
      document.getElementById('editora').innerHTML = `Editora: ${comic.publisher}`;
      document.querySelector('.message').style.display = 'none';
  }
  //salvar o valor do select no localStorage
  let user = usuarioLogado();
  let quadrinhoId = comic.id;
  quadrinhoStatus.addEventListener('change', () => {
      localStorage.setItem(`usuario-${user.email}-quadrinho-${quadrinhoId}-selectedOption`, quadrinhoStatus.value);
  });
  // buscar o valor do select no localStorage
  let selectedOption = localStorage.getItem(`usuario-${user.email}-quadrinho-${quadrinhoId}-selectedOption`);
  if (selectedOption) {
      quadrinhoStatus.value = selectedOption;
      quadrinhoStatus.querySelector(`option[value="${selectedOption}"]`).setAttribute('selected', 'selected');
  }
  // remover o valor do select no localStorage quando o usuário sair da página
  window.addEventListener('beforeunload', () => {
      localStorage.removeItem(`usuario-${user.email}-quadrinho-${quadrinhoId}-selectedOption}`);
  });
}

linksId.forEach(link => {
  link.addEventListener('click', (event) => {
      event.preventDefault();
      const id = link.href.split('id=')[1];
      window.location.href = `quadrinho.html?id=${id}`;
  });
});

comicsService.getComicsById(id)
  .then(comic => {
      renderComicsPage(comic);
  }).catch(err => {
      console.error(err);
  })


//verificação da opção excluir no select
let excluirOption = JSON.parse(localStorage.getItem(`usuario-${usuarioLogado.email}-quadrinho-${id}-excluir`));
if (excluirOption === true) {
  if (!quadrinhoStatus.querySelector('option[value="4"]')) {
      const excluirOption = document.createElement('option');
      excluirOption.value = '4';
      excluirOption.text = 'Excluir';
      quadrinhoStatus.appendChild(excluirOption);
  }
}

//atualização do elemento select
function updateSelect() {
  let status = quadrinhoStatus.value;
  let excluirOption = quadrinhoStatus.querySelector('option[value="4"]');
  if ((status === '1' || status === '2' || status === '3') && !excluirOption) {
      excluirOption = document.createElement('option');
      excluirOption.classList.add('bg-white', 'text-dark');
      excluirOption.value = '4';
      excluirOption.text = 'Excluir';
      quadrinhoStatus.appendChild(excluirOption);
      localStorage.setItem(`usuario-${usuarioLogado.email}-quadrinho-${id}-excluir`, JSON.stringify(true));
  } else if (status !== '1' && status !== '2' && status !== '3' && excluirOption) {
      quadrinhoStatus.querySelector('option[value=""]').disabled = true;
      quadrinhoStatus.querySelector('option[value=""]').selected = true;
      quadrinhoStatus.removeChild(excluirOption);
      localStorage.removeItem(`usuario-${usuarioLogado.email}-quadrinho-${id}-excluir`);
  }
}

window.addEventListener('load', () => {
  updateSelect();
})

quadrinhoStatus.addEventListener('change', async () => {
  let status = quadrinhoStatus.value;
  comicsService.addComicsByStatus(status, id);
  updateSelect();
});


//criação do select de forma dinâmica
let options = [
  { value: '', text: 'Adicionar', disabled: true, selected: true },
  { value: '1', text: 'Lido' },
  { value: '2', text: 'Lendo' },
  { value: '3', text: 'Quero ler' }
];

quadrinhoStatus.innerHTML = '';
options.forEach(option => {
  let optionElement = document.createElement('option');
  optionElement.classList.add('bg-white', 'text-dark');
  optionElement.value = option.value;
  optionElement.text = option.text;
  quadrinhoStatus.appendChild(optionElement);
      if (option.disabled) {
      optionElement.disabled = true;
      optionElement.selected = true;
  }
});

//toasts
if (quadrinhoStatus && toastElement) {
  let toast = new bootstrap.Toast(toastElement);
  quadrinhoStatus.addEventListener('change', () => {
      let status = quadrinhoStatus.value;
      switch (status) {
          case '1':
              document.querySelector('.toast-body').innerHTML = 'Quadrinho adicionado à lista de lidos.';
              toast.show();
              break;
          case '2':
              document.querySelector('.toast-body').innerHTML = 'Quadrinho adicionado à lista de lendo.';
              toast.show();
              break;
          case '3':
              document.querySelector('.toast-body').innerHTML = 'Quadrinho adicionado à lista de quero ler.';
              toast.show();
              break;
          default:
              document.querySelector('.toast-body').innerHTML = 'Quadrinho removido.';
              toast.show();
              break;
      }
  });
}