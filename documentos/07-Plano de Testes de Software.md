# Plano de Testes de Software

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


|Caso de Teste    | CT-05 - Verificar o funcionamento criar lista |
|:---|:---|
| Requisitos Associados | RF-11:    O sistema deve permitir o usuário criar, editar e deletar listas de quadrinhos customizadas.  |
| Objetivo do Teste | Verificar se esta sendo inserido dados pelo usuário. |
| Passos | **1.** Acessar o navegador. 		   **2.** Informar o endereço do site.		  **3.** Preencher o formulário de Login e clicar em "Entrar".  **4.** Clicar em "Listas" **5.** Clicar no botão "Criar nova lista" **6.** Preencher o formulário com os dados da nova lista. **7.** Clicar em "Salvar".|
| Critérios de êxito | Deve ocorrer uma validação após o usuário clicar no botão "Salvar, e em seguida deve apareecr a mensagem "Lista criada com sucesso!" e os dados inseridos vão aparecer na página "Listas". |
| Responsável pela elaboração do caso de Teste | Marcos e Jéssica |


|Caso de Teste    | CT-06 - Verificar funcionalidade editar lista |
|:---|:---|
| Requisitos Associados |  RF-11:    O sistema deve permitir o usuário criar, editar e deletar listas de quadrinhos customizadas. |
| Objetivo do Teste | Verificar se esta editando suas lista com exito. |
| Passos | **1.** Acessar o navegador. 		   **2.** Informar o endereço do site.		  **3.** Preencher o formulário de Login e clicar em "Entrar".  **4.** Clicar em "Listas" **5.** Clicar no botão editar lista. **6** Fazer modificações nos campos da lista. **7** Clicar no botão "Salvar" |
| Critérios de êxito | Deve ocorrer uma validação após o usuário clicar no botão "Salvar, e em seguida deve apareecr a mensagem "Lista criada com sucesso!" e os dados atualizados vão aparecer na página "Listas"|
| Responsável pela elaboração do caso de Teste | Marcos e Jéssica |

|Caso de Teste    | CT-07 - Verificar funcionalidade excluir lista |
|:---|:---|
| Requisitos Associados |  RF-11:    O sistema deve permitir o usuário criar, editar e deletar listas de quadrinhos customizadas.  |
| Objetivo do Teste | Verificar se a funcionalidade de excluir lista esta sendo execultada corretamente. |
| Passos | **1.** Acessar o navegador		**2.** Informar o endereço do site.		**3.** Clicar em criar lista. **4.** Clicar em excluir lista |
| Critérios de êxito | Deve ocorrer uma validação após o usuário clicar na opção de status desejada, e em seguida deve aparecer uma mensagem. |
| Responsável pela elaboração do caso de Teste | Marcos e Jéssica |


|Caso de Teste    | CT-08 - Verificar o funcionamento da funcionalidade de cadastro |
|:---|:---|
| Requisitos Associados | RF-04:	O sistema deve permitir ao usuário cadastrar uma conta |
| Objetivo do Teste | Verificar se o usuário consegue cadastrar uma conta. Verificar mensagens de erro e de sucesso. |
| Passos | **1.** Acessar o navegador. 		   **2.** Informar o endereço do site.		  **3.** Clicar em `Criar conta`      **4.** Preencher campos      **5.** Clicar em `Cadastrar`|
| Critérios de êxito | Usuário é cadastrado caso os campos estejam preenchidos de forma correta (não vazios, e o e-mail tem o formato correto). Pós cadastro uma mensagem de sucesso é exibida. Caso algum campo esteja em branco, uma mensagem de erro deve aparecer.|
| Responsável pela elaboração do caso de Teste | Thiago |


|Caso de Teste    | CT-09 - Verificar o funcionamento da funcionalidade de login |
|:---|:---|
| Requisitos Associados | RF-09:	O sistema deve permitir ao usuário fazer o login da sua conta |
| Objetivo do Teste | Verificar se o usuário consegue cadastrar uma conta. Verificar mensagens de erro e de sucesso. |
| Passos | **1.** Acessar o navegador. 		   **2.** Informar o endereço do site.		  **3.** Clicar em `Entrar`      **4.** Preencher campos      **5.** Clicar em `Enviar`|
| Critérios de êxito | Usuário acessa com sucesso sua conta caso seu nome de usuário e senha coincidam. Pós ingressar na conta, usuário é redirecionado à página Homepage. Caso algum campo esteja em branco, uma mensagem de erro deve aparecer.|
| Responsável pela elaboração do caso de Teste | Thiago |

|Caso de Teste    | CT-10 - Verificar o funcionamento da Homepage |
|:---|:---|
| Requisitos Associados | RF-02:	O sistema deve oferecer uma funcionalidade de separar os quadrinhos de acordo com cada categoria. |
| Objetivo do Teste | Verificar se os titulos estão sendo adicionados na categoria informado pelo usuário. |
| Passos | **1.** Acessar o navegador. 		   **2.** Informar o endereço do site.		  **3.** Preencher o formulário de Login e clicar em "Entrar".  **4.** Pesquisar determinado quadrinho.  **5.** Clicar em "Adicionar". **6.** Escolher entre as opções. **7.** Clicar em "Home" |
| Critérios de êxito | Os  quadrinhos adicionados deverão ser apresentados na Homepage conforme cada opção escolhida pelo usuário. |
| Responsável pela elaboração do caso de Teste | Jessica |

|Caso de Teste    | CT-11 - Verificar o funcionamento da funcionalidade de avaliação | 
|:---|:---|
| Requisitos Associados | RF-01:	O sistema deve permitir ao usuário registrar avaliação aos quadrinhos. |
| Objetivo do Teste | Verificar se o usuário consegue avaliar o quadrinho. |
| Passos | **1.** Acessar o navegador. 		   **2.** Informar o endereço do site.		  **3.** Preencher o formulário de Login e clicar em "Entrar".  **4.** Clicar e digitar no fitlro de pesquisa um termo de título, autor ou editora de quadrinhos  **5.** Clicar no título do quadrinho desejado, **6.** Avaliar o quadrinho em até 5 estrelas |
| Critérios de êxito | O usuário deve conseguir avaliar o quadrinho. |
| Responsável pela elaboração do caso de Teste | Nico |

