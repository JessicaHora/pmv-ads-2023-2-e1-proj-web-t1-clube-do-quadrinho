// objeto para tratar dos dados salvos;
import { Bd } from "../../services/lists-service/lists-service.js";
import { usuarioLogado } from "../../services/account-service/account-service.js";

window.addEventListener('load', function () {
    if (!usuarioLogado()) {
     window.location.href = '../login/login-page.html'
   }
});

let bd = new Bd();

// funcao carregarLista();
function carregarLista() {

    let registros, dadosBody;

    registros = Array();

    registros = bd.recuperarDadosStorage();

    dadosBody = document.getElementsByTagName('tbody');

    registros.forEach(function (r) {
        //Criar um novo elemento tr
        let tr = document.createElement('tr');

        //Cria e configura o td do titulo
        let tdTitulo = document.createElement('td');
        tdTitulo.className = 'col-4 flex-wrap ps-4';
        let aTitulo = document.createElement('a');
        aTitulo.className = `title-large text-black tituloLista${r.id}`;
        aTitulo.href = `../lista/lista.html?id=${r.id}`;
        aTitulo.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.replace(`${window.location.origin}/codigo-fonte/src/paginas/paginaListas/lista/lista.html?id=${r.id}`);
        })
        aTitulo.innerHTML = r.titulo;
        tdTitulo.appendChild(aTitulo);

        //Cria e configura o td da descrição
        let tdDescricao = document.createElement('td');
        tdDescricao.className = 'col-6 flex-wrap title-large text-muted tituloDescricao';
        tdDescricao.innerHTML = r.descricao;

        //Criar e configura o td do botão de editar
        let tdEditar = document.createElement('td');
        tdEditar.className = 'col-1 pt-3 editar'
        tdEditar.id = 'editar'
        tdEditar.style.cursor = 'pointer';
        tdEditar.title = 'Editar';
        let aEditar = document.createElement('a');
        aEditar.addEventListener('click', function (event) {
            event.preventDefault();
            window.location.replace(`${window.location.origin}/codigo-fonte/src/paginas/paginaListas/editarLista/editar-lista.html?id=${r.id}`);
        }); //adiciona o evento de clique
        aEditar.innerHTML = '<i class="bi bi-pencil-fill"></i>';
        tdEditar.appendChild(aEditar);

        //Criar e configura o td do botão de excluir
        let tdExcluir = document.createElement('td');
        tdExcluir.className = 'col-1 pt-3'
        tdExcluir.id = 'excluir'
        tdExcluir.style.cursor = 'pointer';
        let aExcluir = document.createElement('a');
        aExcluir.className = 'removerLista';
        aExcluir.title = 'Excluir';
        aExcluir.href = '';
        let idLista = r.id;
        aExcluir.addEventListener('click', (function (id) {
            return function (event) {
                event.preventDefault();
                bd.excluirLista(id);
            }
        })(idLista));
        aExcluir.innerHTML = '<i class="bi bi-trash-fill"></i>';
        tdExcluir.appendChild(aExcluir);

        //Adiciona os tds na tr
        tr.appendChild(tdTitulo);
        tr.appendChild(tdDescricao);
        tr.appendChild(tdEditar);
        tr.appendChild(tdExcluir);
        dadosBody[0].appendChild(tr);

    });
    atualizarListaVazia();
}

function atualizarListaVazia() {
    var tabela = document.querySelector('.guardaLista table tbody');
    var listaVazia = document.querySelector('.listaVazia');
    if (tabela.childElementCount > 0) {
        // Se a tabela tem alguma linha, remova a classe 'listaVazia--vazia'
        listaVazia.classList.remove('listaVazia--vazia');
    } else {
        // Se a tabela não tem nenhuma linha, adicione a classe 'listaVazia--vazia'
        listaVazia.classList.add('listaVazia--vazia');
    }
}

document.addEventListener('DOMContentLoaded', carregarLista);

