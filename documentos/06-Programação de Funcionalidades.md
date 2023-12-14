# Programação de Funcionalidades

Implementação da aplicação descritas por meio dos requisitos codificados.

### Tela de cadastro

![Captura de tela 2023-11-27 162203](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e1-proj-web-t1-clube-do-quadrinho/assets/99574248/f08e29d0-4575-4d89-bde1-cad396c53b5e)

#### Requisito atendido

- RF-03: O sistema deve permitir ao usuário cadastrar uma conta.
- RF-02: O sistema deve oferecer uma funcionalidade de pesquisa para permitir ao usuário encontrar e descobrir quadrinhos.

#### Artefatos da funcionalidade

- cadastro-page.html
- cadastro-page.css
- custom-theme.css
- cadastro-page.js
- account-service.js
- search.js

#### Estrutura de dados

Estrutura de dados do objeto do usuário:

    var novoUsuario = {
        id: usuarios.length + 1,
        username: "",
        email: "",
        senha: "",
        quadrinhos: {
        lido: [],
        lendo: [],
        queroLer: [],
        },
        listas: []
    }

#### Instruções de acesso

Em um navegador de Internet, informe a URL: [url da navegação]
No canto superior direito, no menu de navegação, clique em "Criar conta" para ter acesso à página de Cadastro.

#### Responsável

Thiago Bastani Pontel Oliveira

---

### Tela de login

![Captura de tela 2023-11-27 162152](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e1-proj-web-t1-clube-do-quadrinho/assets/99574248/a7bd725c-0de7-47d1-905c-667da4943aea)

#### Requisito atendido

- RF-07: O sistema deve permitir ao usuário fazer o login da sua conta.
- RF-02: O sistema deve oferecer uma funcionalidade de pesquisa para permitir ao usuário encontrar e descobrir quadrinhos.

#### Artefatos da funcionalidade

- login-page.html
- login-page.css
- custom-theme.css
- login-page.js
- account-service.js
- search.js

#### Estrutura de dados

Estrutura de dados do objeto do usuário:

    var usuarioLogado = {
        id: usuarios.length + 1,
        username: "",
        email: "",
        senha: "",
        quadrinhos: {
        lido: [],
        lendo: [],
        queroLer: [],
        },
        listas: []
    }

#### Instruções de acesso

Em um navegador de Internet, informe a URL: [url da navegação]
No canto superior direito, no menu de navegação, clique em "Entrar" para ter acesso à página de Cadastro.

#### Responsável

Thiago Bastani Pontel Oliveira

---

### Tela de quadrinho

![Captura de tela 2023-11-27 162107](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e1-proj-web-t1-clube-do-quadrinho/assets/99574248/4a6b8f90-d96e-410d-b95d-02406192457a)

#### Requisito atendido

- RF-01: O sistema deve permitir ao usuário registrar avaliação aos quadrinhos.
- RF-06: O sistema deve permitir ao usuário visualizar as informações dos quadrinhos.
- RF-05: O sistema deve permitir ao usuário registrar quadrinhos como lidos, lendo e a ler.
- RF-02: O sistema deve oferecer uma funcionalidade de pesquisa para permitir ao usuário encontrar e descobrir quadrinhos.

#### Artefatos da funcionalidade

- quadrinho.html
- quadrinho-style.css
- custom-theme.css
- quadrinho.js
- comics-service.js
- account-service.js
- search.js
- logout.js

#### Estrutura de dados

Estrutura de dados do objeto do quadrinho:

        var quadrinho =  {
            id: "", 
            title: "",
            description: "",
            image: "",
            creators: [],
            publisher: "",
            publishedDate: "",
            pageCount: "",
            status: {
                lido: false,
                lendo: false,
                queroLer: false,
            }
        }

#### Instruções de acesso

Em um navegador de Internet, informe a URL: [url da navegação]
Na barra de pesquisa no na parte superior, insira um termo (título, autor ou editora) para pesquisar quadrinhos na plataforma, no caso de haver resultados disponíveis, clique no quadrinho desejado para acessar a tela do quadrinho e visualizar suas informações.

#### Responsável

Nico Rocha da Costa

---

### Tela de listas

![Captura de tela 2023-11-27 162000](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e1-proj-web-t1-clube-do-quadrinho/assets/99574248/28844471-29d6-4996-b973-9ddbdc05cfa9)

#### Requisito atendido

- RF-08: O sistema deve permitir o usuário visualizar e interagir com suas listas criadas.
- RF-02: O sistema deve oferecer uma funcionalidade de pesquisa para permitir ao usuário encontrar e descobrir quadrinhos.

#### Artefatos da funcionalidade

- index.html
- lista-style.css
- style.css
- custom-theme.css
- script.js
- search.js
- logout.js

#### Estrutura de dados

Estrutura de dados do objeto de lista: 

    var lista = {
        id: Math.random().toString(36).substring(2, 9),
        titulo: "",
        descricao: "",
        quadrinhos: {
            lido: [],
            lendo: [],
            queroLer: [],
            }
        }

#### Instruções de acesso

Em um navegador de Internet, informe a URL: [url da navegação]
Ao fazer login na aplicação, no canto superior direito, no menu de navegação, clique em "Listas" para ter acesso à página de listas.

#### Responsável

Marcos Vinicio Araujo Almeida

---

### Tela de criar nova lista

![Captura de tela 2023-11-27 162016](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e1-proj-web-t1-clube-do-quadrinho/assets/99574248/bba5f337-e4cb-4826-ab93-97532b21b83f)

#### Requisito atendido

- RF-09: O sistema deve permitir o usuário criar, editar e deletar listas de quadrinhos customizadas.
- RF-02: O sistema deve oferecer uma funcionalidade de pesquisa para permitir ao usuário encontrar e descobrir quadrinhos.

#### Artefatos da funcionalidade

- nova-lista.html
- lista-style.css
- custom-theme.css
- nova-lista.js
- search.js
- logout.js

#### Estrutura de dados

Estrutura de dados do objeto de lista: 

    var novaLista = {
        id: Math.random().toString(36).substring(2, 9),
        titulo: "",
        descricao: "",
        quadrinhos: {
            lido: [],
            lendo: [],
            queroLer: [],
            }
        }

#### Instruções de acesso

Em um navegador de Internet, informe a URL: [url da navegação]
Ao fazer login na aplicação, no canto superior direito, no menu de navegação, clique em "Listas" para ter acesso à página de listas. Na página de listas clique em "Criar nova lista" para acessar a página de criar nova lista.

#### Responsável

Jessica Hora dos Santos
Marcos Vinicio Araujo Almeida

---

### Tela de editar lista

![Captura de tela 2023-11-27 162041](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e1-proj-web-t1-clube-do-quadrinho/assets/99574248/721195bb-dd69-4345-a5b6-8da28a95f754)

#### Requisito atendido

- RF-09: O sistema deve permitir o usuário criar, editar e deletar listas de quadrinhos customizadas.
- RF-02: O sistema deve oferecer uma funcionalidade de pesquisa para permitir ao usuário encontrar e descobrir quadrinhos.

#### Artefatos da funcionalidade

- editar-lista.html
- editar-lista.css
- custom-theme.css
- search.js
- logout.js

#### Estrutura de dados

Estrutura de dados do objeto de lista: 

    var lista = {
        id: Math.random().toString(36).substring(2, 9),
        titulo: "",
        descricao: "",
        quadrinhos: {
            lido: [],
            lendo: [],
            queroLer: [],
            }
        }


#### Instruções de acesso

Em um navegador de Internet, informe a URL: [url da navegação]
Ao fazer login na aplicação, no canto superior direito, no menu de navegação, clique em "Listas" para ter acesso à página de listas. Na página de listas, caso tenha listas criadas, clique em "Editar" para acessar a página de editar lista.

#### Responsável

Jessica Hora dos Santos
Marcos Vinicio Araujo Almeida

---	

### Tela de uma lista

![Captura de tela 2023-11-27 171256](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e1-proj-web-t1-clube-do-quadrinho/assets/99574248/19db7fcb-d04b-4795-8d01-6ba890a63c45)

#### Requisito atendido

- RF-08: O sistema deve permitir o usuário visualizar e interagir com suas listas criadas.
- RF-02: O sistema deve oferecer uma funcionalidade de pesquisa para permitir ao usuário encontrar e descobrir quadrinhos.

#### Artefatos da funcionalidade

- lista.html
- lista.css
- custom-theme.css
- lista.js
- search.js
- logout.js

#### Estrutura de dados

Estrutura de dados do objeto de lista: 

    var lista = {
        id: Math.random().toString(36).substring(2, 9),
        titulo: "",
        descricao: "",
        quadrinhos: {
            lido: [],
            lendo: [],
            queroLer: [],
            }
        }

#### Instruções de acesso

Em um navegador de Internet, informe a URL: [url da navegação]
Ao fazer login na aplicação, no canto superior direito, no menu de navegação, clique em "Listas" para ter acesso à página de listas. Na página de listas, caso tenha listas criadas, clique no título da lista desejada para acessar a página de uma lista.

#### Responsável

Nico Rocha da Costa

---

### Tela Homepage

![Captura de tela 2023-11-27 161935](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e1-proj-web-t1-clube-do-quadrinho/assets/99574248/8b7339c3-d87d-4f29-9914-eed1d1e377a3)

#### Requisito atendido

- RF-04: O sistema deve oferecer ao usuário uma página geral com todos os quadrinhos registrados e separados nas categorias de lidos, lendo e a ler.
- RF-02: O sistema deve oferecer uma funcionalidade de pesquisa para permitir ao usuário encontrar e descobrir quadrinhos.

#### Artefatos da funcionalidade

- Homepage.html
- Homepage.css
- custom-theme.css
- Homepage.js
- search.js
- logout.js

#### Estrutura de dados

Estrutura de dados do objeto do quadrinho:

        var quadrinho =  {
            id: "", 
            title: "",
            description: "",
            image: "",
            creators: [],
            publisher: "",
            publishedDate: "",
            pageCount: "",
            status: {
                lido: false,
                lendo: false,
                queroLer: false,
            }
        }

#### Instruções de acesso

Em um navegador de Internet, informe a URL: [url da navegação]
Ao fazer login na aplicação, no canto superior direito, no menu de navegação, clique em "Home" para ter acesso à página de Home.

#### Responsável

Jessica Hora dos Santos

---

### Tela de resultados de pesquisa

![Captura de tela 2023-11-27 162140](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2023-2-e1-proj-web-t1-clube-do-quadrinho/assets/99574248/da35332d-f9ae-4a89-bf37-373b2e0c5c52)

#### Requisito atendido

- RF-02: O sistema deve oferecer uma funcionalidade de pesquisa para permitir ao usuário encontrar e descobrir quadrinhos.

#### Artefatos da funcionalidade

- search.js

#### Estrutura de dados

Estrutura de dados do objeto do quadrinho:

        var quadrinho =  {
            id: "", 
            title: "",
            description: "",
            image: "",
            creators: [],
            publisher: "",
            publishedDate: "",
            pageCount: "",
            status: {
                lido: false,
                lendo: false,
                queroLer: false,
            }
        }

#### Instruções de acesso

Em um navegador de Internet, informe a URL: [url da navegação]
Na barra de pesquisa no na parte superior, insira um termo (título, autor ou editora) para pesquisar quadrinhos na plataforma, no caso de haver resultados disponíveis, clique no quadrinho desejado para acessar a tela do quadrinho e visualizar suas informações.

#### Responsável

Nico Rocha da Costa