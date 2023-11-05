import { usuarioLogado } from "../account-service/account-service.js";

class Bd {
    constructor() {
        this.usuario = usuarioLogado()
    }

    //criar uma nova lista
    criarLista(lista) {
        this.usuario.listas.push(lista);
        //atualizando o usuario no local storage
        localStorage.setItem(`usuario-${this.usuario.id}`, JSON.stringify(this.usuario));
        //atualizar objeto de usuário no sessionStorage
        sessionStorage.setItem("usuario", JSON.stringify(this.usuario));
    }

    //ler uma lista especifica do usuario
    lerListasPorId(id) {
        return this.usuario.listas.find(lista => lista.id === id);
    }

    //atualizar uma lista
    atualizarLista(listaId, novaLista) {
        let lista = this.usuario.listas.find(lista => lista.id === listaId);
        Object.assign(lista, novaLista);
        //atualizando o usuario no local storage
        localStorage.setItem(`usuario-${this.usuario.id}`, JSON.stringify(this.usuario));
        //atualizar objeto de usuário no sessionStorage
        sessionStorage.setItem("usuario", JSON.stringify(this.usuario));
    }

    //excluir uma lista
    excluirLista(listaId) {
        let toastConfirmacao = new bootstrap.Toast(document.getElementById('toastConfirmacao'), { autohide: false });
        toastConfirmacao.show();

        document.getElementById('btnConfirmar').addEventListener('click', () => {
            this.usuario.listas = this.usuario.listas.filter(lista => lista.id !== listaId);
            localStorage.setItem(`usuario-${this.usuario.id}`, JSON.stringify(this.usuario));
            sessionStorage.setItem("usuario", JSON.stringify(this.usuario));
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
        let lista = usuario.listas.find(lista => lista.id === listaId);
        if (lista) {
            ['lido', 'lendo', 'queroLer'].forEach(status => {
                if (lista.quadrinhos[status].some(quadrinho => quadrinho.id === quadrinhoId)) {
                    lista.quadrinhos[status] = lista.quadrinhos[status].filter(quadrinho => quadrinho.id !== quadrinhoId);
                    //atualizando o usuario no local storage
                    atualizarUsuario();
                }
            });
        }
    }

    // funcao para recuperar dados do localstorage;
    recuperarDadosStorage() {
        return this.usuario.listas;
    }
}

export { Bd }