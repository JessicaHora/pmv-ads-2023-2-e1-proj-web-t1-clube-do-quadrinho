import { usuarioLogado } from "../account-service/account-service.js";

class Bd {
    constructor() {
        this.usuario = usuarioLogado()
    }

    //criar uma nova lista
    criarLista(lista) {
        let usuario = usuarioLogado(); 
        let user = JSON.parse(localStorage.getItem(`usuario-${usuario.email}`));
        user.listas.push(lista);
        //atualizando o usuario no local storage
        localStorage.setItem(`usuario-${usuario.email}`, JSON.stringify(user));
    }

    //ler uma lista especifica do usuario
    lerListasPorId(id) {
        return localStorage.getItem(`usuario-${this.usuario.email}`) ? JSON.parse(localStorage.getItem(`usuario-${this.usuario.email}`)).listas.find(lista => lista.id === id) : [];
    }

    //atualizar uma lista
    atualizarLista(listaId, novaLista) {
        let usuario = usuarioLogado();
        let user = JSON.parse(localStorage.getItem(`usuario-${usuario.email}`));
        let lista = user.listas.find(lista => lista.id === listaId);
        Object.assign(lista, novaLista);
        //atualizando o usuario no local storage
        localStorage.setItem(`usuario-${this.usuario.email}`, JSON.stringify(user));
    }

    //excluir uma lista
    excluirLista(listaId) {
        let usuario = usuarioLogado();
        let user = JSON.parse(localStorage.getItem(`usuario-${usuario.email}`));
        let toastConfirmacao = new bootstrap.Toast(document.getElementById('toastConfirmacao'), { autohide: false });
        toastConfirmacao.show();

        document.getElementById('btnConfirmar').addEventListener('click', () => {
            user.listas = user.listas.filter(lista => lista.id !== listaId);
            localStorage.setItem(`usuario-${this.usuario.email}`, JSON.stringify(user));
            toastConfirmacao.hide();
            //toast de sucesso
            let toastSucesso = new bootstrap.Toast(document.querySelector('.toastSucesso'));
            document.querySelector('.bodySucesso').innerHTML = 'Lista excluída com sucesso!';
            toastSucesso.show();
            setTimeout(() => {
                window.location.reload();
            }, 1600);            
        });
    }
    //excluir qudrinho de uma lista
    excluirQuadrinhoLista(listaId, quadrinhoId) {
        let usuario = usuarioLogado();
        let user = JSON.parse(localStorage.getItem(`usuario-${usuario.email}`));
        let lista = user.listas.find(lista => lista.id === listaId);
        if (lista) {
            ['lido', 'lendo', 'queroLer'].forEach(status => {
                if (lista.quadrinhos[status].some(quadrinho => quadrinho.id === quadrinhoId)) {
                    lista.quadrinhos[status] = lista.quadrinhos[status].filter(quadrinho => quadrinho.id !== quadrinhoId);
                    //atualizando o usuario no local storage
                    localStorage.setItem(`usuario-${usuario.email}`, JSON.stringify(user));
                }
            });
        }
    }

    // funcao para recuperar dados do localstorage;
    recuperarDadosStorage() {
        return localStorage.getItem(`usuario-${this.usuario.email}`) ? JSON.parse(localStorage.getItem(`usuario-${this.usuario.email}`)).listas : [];
    }
}

export { Bd }