import {
  usuarioLogado
} from "../../services/account-service/account-service.js";
import * as comicsService from "../../services/comics-service/comics-service.js";
import { Bd } from "../../services/lists-service/lists-service.js"

let linksId = document.querySelectorAll('a[href*="quadrinho.html?id="]');
let urlParams = new URLSearchParams(window.location.search);
let id = parseInt(urlParams.get("id"), 10);
let quadrinhoStatus = document.getElementById("adicionarQuadrinho");
let toastElement = document.querySelector('.toast');

//renderizar página de quadrinho
function renderComicsPage(comic) {
  if (!usuarioLogado()) {
    //navbar
    let login = document.createElement('a');
    login.className = 'nav-link';
    login.href = '../login/login-page.html';
    login.innerHTML = 'Entrar';
    let cadastro = document.createElement('a');
    cadastro.className = 'nav-link';
    cadastro.href = '../cadastro/cadastro-page.html';
    cadastro.innerHTML = 'Criar conta';
    let navItem1 = document.querySelectorAll('.nav-item')[0];
    navItem1.appendChild(login);
    let navItem2 = document.querySelectorAll('.nav-item')[1];
    navItem2.appendChild(cadastro);
    //content
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
    //navbar
    document.getElementById('home').classList.remove('d-none');
    document.getElementById('listas').classList.remove('d-none');
    document.getElementById('sair').classList.remove('d-none');
    //content
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

//carregar listas no modal de adicionar quadrinho
let modalElement = document.getElementById('addlista');
modalElement.addEventListener('show.bs.modal', function (event) {
  carregarListaQuadrinho();
});

//esvaziar o modal de adicionar quadrinho ao fechar
let modalElementEmpty = document.getElementById('addlista');
modalElementEmpty.addEventListener('hidden.bs.modal', function (event) {
  let tabela = document.querySelector('tbody');
  tabela.innerHTML = '';
});

let bd = new Bd();

function carregarListaQuadrinho() {
    let registros, dadosBody;
    registros = Array();
    registros = bd.recuperarDadosStorage();
    dadosBody = document.querySelector('tbody');

    registros.forEach(function (r) {
        //Criar um novo elemento tr
        let tr = document.createElement('tr');

        //Cria e configura o td do titulo
        let tdTitulo = document.createElement('td');
        tdTitulo.className = 'ps-5 title-medium';
        tdTitulo.style.cursor = 'pointer';
        let aTitulo = document.createElement('a');
        // aTitulo.className = 'body-large'
        aTitulo.innerHTML = r.titulo;
        tdTitulo.appendChild(aTitulo);

        tr.appendChild(tdTitulo);
        dadosBody.appendChild(tr);
    });
}