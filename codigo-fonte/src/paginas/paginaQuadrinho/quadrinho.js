import {
  usuarioLogado
} from "../../services/account-service/account-service.js";
import * as comicsService from "../../services/comics-service/comics-service.js";
import { Bd } from "../../services/lists-service/lists-service.js"

let urlParams = new URLSearchParams(window.location.search);
let id = urlParams.get("id");
let quadrinhoStatus = document.getElementById("adicionarQuadrinho");
let toastElement = document.querySelector('.toast');
let addListaModal = document.getElementById('addListaModal');
let bd = new Bd();

window.addEventListener('load', function () {
  if (!id && usuarioLogado()) {
    window.location.href = '../Homepage/Homepage.html'
  } else if (!id && !usuarioLogado()) {
    window.location.href = '../login/login-page.html'
  }
});

function renderElement(id, prefix, value) {
  document.getElementById(id).innerHTML = `${prefix}: ${value || 'Não informado'}`;
}

function loadComicsData(comic) {
  let thumbnailUrl = comic.volumeInfo.imageLinks.thumbnail.replace('zoom=1', 'zoom=0').replace('http', 'https');
  let publishedDate = new Date(comic.volumeInfo.publishedDate);
  let day = String(publishedDate.getDate()).padStart(2, '0');
  let month = String(publishedDate.getMonth() + 1).padStart(2, '0');
  let year = publishedDate.getFullYear();
  let date = `${day}/${month}/${year}`;
  let ratings = comicsService.getAverageRating(comic.id);

  document.head.querySelector('title').innerHTML = comic.volumeInfo.title;
  document.getElementById('capa-quadrinho').src = thumbnailUrl;
  document.getElementById('titulo-quadrinho').innerHTML = comic.volumeInfo.title;
  document.getElementById('criadores').innerHTML = comic.volumeInfo.authors.join(', ');
  document.getElementById('avaliacoes-quadrinhos').innerHTML = `${ratings}`;
  document.getElementById('descricao').innerHTML = comic.volumeInfo.description;
  renderElement('data', 'Data de lançamento', date);
  renderElement('editora', 'Editora', comic.volumeInfo.publisher);
  renderElement('paginas', 'Número de páginas', comic.volumeInfo.pageCount);

}

function renderComicsPage(comic) {
  if (!usuarioLogado()) {
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
    let content = document.querySelector('.actionBox');
    content.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'h-100', 'bg-tertiary-light', 'text-center', 'body-small', 'p-2', 'rounded', 'mt-2');
    loadComicsData(comic);
  } else {
    let user = usuarioLogado();
    loadComicsData(comic);
    ['home', 'listas', 'sair'].forEach(id => document.getElementById(id).classList.remove('d-none'));
    ['adicionarQuadrinho', 'adicionarLista', 'avaliarQuadrinho'].forEach(id => document.getElementById(id).classList.remove('d-none'));
    document.querySelector('.message').style.display = 'none';
  }
}

comicsService.getComicsById(id)
  .then(comic => {
    renderComicsPage(comic);
  }).catch(err => {
    console.error(err);
  });

document.addEventListener('DOMContentLoaded', () => {
  //busca a avaliacao do usuario no localStorage
  let comicRatings = JSON.parse(localStorage.getItem('ratings')) || {};
  let user = usuarioLogado();
  let userId = user.id;
  let comicId = id;

  if (comicRatings[comicId] && comicRatings[comicId][userId]) {
    let rating = comicRatings[comicId][userId];
    let stars = document.querySelectorAll('#avaliarQuadrinho .bi-star');

    for (let i = 0; i < rating; i++) {
      stars[i].classList.add('active');
      stars[i].classList.replace('bi-star', 'bi-star-fill');
    }
  }
});

window.onload = function () {
  updateSelect();
}

//atualização do elemento select
function updateSelect() {
  let status = quadrinhoStatus.value;
  let user = usuarioLogado();
  let excluirOption = quadrinhoStatus.querySelector('option[value="4"]');
  if ((status === '1' || status === '2' || status === '3') && !excluirOption) {
    excluirOption = document.createElement('option');
    excluirOption.classList.add('bg-white', 'text-dark');
    excluirOption.value = '4';
    excluirOption.text = 'Excluir';
    quadrinhoStatus.appendChild(excluirOption);
    localStorage.setItem(`usuario-${user.id}-quadrinho-${id}-excluir`, JSON.stringify(true));
  } else if (status !== '1' && status !== '2' && status !== '3' && excluirOption) {
    quadrinhoStatus.querySelector('option[value=""]').disabled = true;
    quadrinhoStatus.querySelector('option[value=""]').selected = true;
    quadrinhoStatus.removeChild(excluirOption);
    localStorage.removeItem(`usuario-${user.id}-quadrinho-${id}-excluir`);
  }
}

//verificação da opção excluir no select
let usuario = usuarioLogado();
let excluirOption = JSON.parse(localStorage.getItem(`usuario-${usuario.id}-quadrinho-${id}-excluir`));
if (excluirOption === true) {
  if (!quadrinhoStatus.querySelector('option[value="4"]')) {
    const excluirOption = document.createElement('option');
    excluirOption.value = '4';
    excluirOption.text = 'Excluir';
    quadrinhoStatus.appendChild(excluirOption);
  }
}

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

//toasts adicionar quadrinho
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
modalElement.addEventListener('show.bs.modal', function () {
  carregarListaQuadrinho();
});

//esvaziar o modal de adicionar quadrinho ao fechar
let modalElementEmpty = document.getElementById('addlista');
modalElementEmpty.addEventListener('hidden.bs.modal', function () {
  let tabela = document.querySelector('tbody');
  tabela.innerHTML = '';
});

let isRedirected = false;
document.querySelector('#novaLista a').addEventListener('click', function () {
  localStorage.setItem('quadrinhoParaAdicionar', id);
  isRedirected = true;
});

window.addEventListener('beforeunload', function () {
  if (!isRedirected) {
    localStorage.removeItem('quadrinhoParaAdicionar');
  }
});


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
    tdTitulo.className = 'ps-5 title-medium d-flex';
    tdTitulo.id = 'tituloLista'
    tdTitulo.style.cursor = 'pointer';
    tdTitulo.dataset.listId = r.id;

    //evento de click no titulo da lista
    tdTitulo.addEventListener('click', function (event) {
      let icon = event.target.querySelector('i');

      if (icon) {
        event.target.style.backgroundColor = '';
        event.target.removeChild(icon);
      } else {
        event.target.style.backgroundColor = '#d7d5d9';
        icon = document.createElement('i');
        icon.className = 'bi bi-check-circle';
        icon.style.color = 'green';
        event.target.insertBefore(icon, aTitulo)
      }
    });

    let aTitulo = document.createElement('a');
    aTitulo.className = 'ps-2 text-decoration-none text-dark';
    aTitulo.innerHTML = r.titulo;
    tdTitulo.appendChild(aTitulo);

    tr.appendChild(tdTitulo);
    dadosBody.appendChild(tr);
  });
}

addListaModal.addEventListener('click', function () {
  let selectedList = document.querySelector('#tituloLista i.bi.bi-check-circle');
  if (selectedList) {
    let listId = selectedList.parentElement.dataset.listId;
    comicsService.getComicsById(id)
      .then(comic => {
        comicsService.addComicsToList(comic, listId);

        let modal = bootstrap.Modal.getInstance(document.getElementById('addlista'));
        modal.hide();

        //toast 
        let toast = new bootstrap.Toast(toastElement);
        setTimeout(() => {
          document.querySelector('.toast-body').innerHTML = 'Quadrinho adicionado à lista com sucesso!';
          toast.show();
        }, 500);
      })
      .catch(err => {
        console.error(err);
      });
  } else {
    return;
  }
})

//avaliacao do quadrinho
let stars = document.querySelectorAll('.bi-star');
stars.forEach((star, index) => {
  star.addEventListener('mouseover', () => {
    for (let i = 0; i <= index; i++) {
      stars[i].classList.replace('bi-star', 'bi-star-fill');
      stars[i].classList.add('hover');
    }
  });

  star.addEventListener('mouseout', () => {
    stars.forEach(star => {
      if (!star.classList.contains('active')) {
        star.classList.replace('bi-star-fill', 'bi-star');
      }
      star.classList.remove('hover');
    })
  });
});

let avaliarInputs = document.querySelectorAll('#avaliarQuadrinho input');
avaliarInputs.forEach((input, index) => {
  input.addEventListener('click', function () {
    let user = usuarioLogado();
    let rating = this.value;
    let ratings = JSON.parse(localStorage.getItem('ratings')) || {};
    let userId = user.id;
    let comicId = id;

    if (!ratings[comicId]) {
      ratings[comicId] = {};
    }

    ratings[comicId][userId] = rating;
    localStorage.setItem('ratings', JSON.stringify(ratings));

    stars.forEach(star => {
      star.classList.remove('active');
      star.classList.replace('bi-star-fill', 'bi-star');
    });

    for (let i = 0; i <= index; i++) {
      stars[i].classList.add('active');
      stars[i].classList.replace('bi-star', 'bi-star-fill');
    }
  });
});

//persistencia do select
quadrinhoStatus.addEventListener('change', function () {
  let user = usuarioLogado();
  let status = this.value;
  localStorage.setItem(`usuario-${user.id}-quadrinho-${id}-status`, status);
});

let user = usuarioLogado();
let savedStatus = localStorage.getItem(`usuario-${user.id}-quadrinho-${id}-status`);
if (savedStatus) {
  quadrinhoStatus.value = savedStatus;
  quadrinhoStatus.querySelector(`option[value="${savedStatus}"]`).setAttribute('selected', 'selected');
}