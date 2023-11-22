# Plano de Testes de Software

[Apresente os cenários de testes a serem utilizados na realização dos testes da aplicação. Escolha cenários de testes que demonstrem os requisitos sendo atendidos. ]

Os testes funcionais a serem realizados na aplicação são descritos a seguir. [Utilize a estrutura abaixo para cada caso de teste]

|Caso de Teste    | CT-01 - Verificar o funcionamento do filtro de pesquisa |
|:---|:---|
| Requisitos Associados | RF-02:	O sistema deve oferecer uma funcionalidade de pesquisa para permitir ao usuário encontrar e descobrir quadrinhos. |
| Objetivo do Teste | Verificar se o filtro de pesquisa está recuperando e apresentando os dados inseridos pelo usuário. |
| Passos | **1.** Acessar o navegador. 		   **2.** Informar o endereço do site.		  **3.** Clicar e digitar no fitlro de pesquisa um termo de título, autor ou editora de quadrinhos e verificar se o resultado é exibido na página. |
| Critérios de êxito | Os dados inseridos no filtro de pesquisa devem buscar quadrinhos relacionados ao termo pesquisado. |
| Responsável pela elaboração do caso de Teste | Nico |

|Caso de Teste    | CT-02 - Verificar funcionalidade da página de quadrinhos |
|:---|:---|
| Requisitos Associados | RF-08:	O sistema deve permitir ao usuário visualizar as informações dos quadrinhos. 
| Objetivo do Teste | Verificar se todas as informações referente ao quadrinho estão sendo exibidas na página de quadrinho. |
| Passos | **1.** Acessar o navegador		**2.** Informar o endereço do site.		**3.** Clicar e digitar no fitlro de pesquisa um termo de título, autor ou editora de quadrinho desejado.		**4.** Caso a pesquisa traga resultados, clicar no título do quadrinho desejado.	**5.** Visualizar a página do quadrinho. |
| Critérios de êxito | Após clicar no quadrinho desejado, o usuário deve ser redirecionado à página do quadrinho e todas as informações seguintes devem ser exibidas: capa do quadrinho, título, autores, descrição, editora, número de páginas e data de lançamento. |
| Responsável pela elaboração do caso de Teste | Nico |

|Caso de Teste    | CT-03 - Verificar funcionalidade de adicionar quadrinhos |
|:---|:---|
| Requisitos Associados | RF-06:	O sistema deve permitir ao usuário registrar quadrinhos como lidos, lendo e a ler.  |
| Objetivo do Teste | Verificar se a funcionalidade de adicionar quadrinhos como lidos, lendo e a ler está  adicionando os quadrinhos corretamente, nos status descritos. |
| Passos | **1.** Acessar o navegador. 		   **2.** Informar o endereço do site. **3.** Preencher o formulário de Login e clicar em "Entrar".  **4.** Clicar e digitar no fitlro de pesquisa um termo de título, autor ou editora de quadrinho desejado.		**5.** Caso a pesquisa traga resultados, clicar no título do quadrinho desejado.	**6.** Clicar no botão "Adicionar" e em seguida clicar no status desejado (lido, lendo ou quero ler). |
| Critérios de êxito | Deve ocorrer uma validação após o usuário clicar na opção de status desejada, e em seguida deve aparecer a mesagem "Quadrinho adicionado como [opcão clicada]".   |
| Responsável pela elaboração do caso de Teste | Nico |

|Caso de Teste    | CT-04 - Verificar funcionalidade de adicionar quadrinho à lista |
|:---|:---|
| Requisitos Associados | RF-12:	O sistema deve permitir o usuário adicionar quadrinhos à listas criadas. |
| Objetivo do Teste | Verificar se a funcionalidade de adicionar quadrinhos à lista está adicionando os quadrinhos corretamente. |
| Passos |  **1.** Acessar o navegador. 	 **2.** Informar o endereço do site. **3.** Preencher o formulário de Login e clicar em "Entrar". 		 **4.** Clicar e digitar no fitlro de pesquisa um termo de título, autor ou editora de quadrinho desejado.		**5.** Caso a pesquisa traga resultados, clicar no título do quadrinho desejado.	**6.** Clicar no botão "Adicionar à lista". 	**7.** Caso tenha listas criadas, clicar na lista desejada. **8.** Clicar no botão "Adicionar". |
| Critérios de êxito |  Deve ocorrer uma validação após o usuário clicar no botão "Adicionar", e em seguida deve aparecer a mensagem "Quadrinho adicionado à lista com sucesso!".  |
| Responsável pela elaboração do caso de Teste | Nico |


 
> **Links Úteis**:
> - [IBM - Criação e Geração de Planos de Teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> -  [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e Geração de Planos de Teste de Software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)
