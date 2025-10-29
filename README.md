# 🎨 Control System (Frontend UI)

Este é o repositório do **Frontend (Interface do Usuário)** do projeto Control System, construído com React.

Esta aplicação consome a [API do Backend (Spring Boot)](https://github.com/jovvaz/Control-System) para fornecer uma interface gráfica moderna e reativa para o gerenciamento de estoque e produção.

---

### 🔗 Backend (API)

O backend (API) deste projeto foi desenvolvido em Spring Boot e está num repositório separado. A API é responsável por toda a lógica de negócio, validações de estoque e persistência de dados.

**➡️ [Acesse o Repositório do Backend aqui](https://github.com/jovvaz/Control-System)**


---

## 🌟 Funcionalidades da Interface

Esta aplicação React foi estruturada usando `react-router-dom` para criar uma experiência de "Single Page Application" (SPA) com múltiplas "guias":

* **Navegação por Guias:** A interface é dividida em 4 seções principais para um fluxo de trabalho claro:
    1.  Lista de Produtos
    2.  Cadastrar Produto
    3.  Dar Entrada (Compra)
    4.  Executar Produção

* **Lista de Produtos (Dashboard):**
    * Exibe **duas tabelas separadas**: uma para "Matérias-Primas" e outra para "Produtos Acabados".
    * A lista é atualizada automaticamente ao visitar a página, garantindo que os dados (como o estoque) estejam sempre corretos.
    * **Funcionalidade de Deletar:** Cada item possui um botão "Deletar" que chama a API `DELETE`. A interface exibe mensagens de erro claras vindas do backend (ex: "Não é possível deletar: Matéria-Prima em uso...").

* **Formulário de Cadastro Inteligente:**
    * Um único formulário que se **adapta dinamicamente**.
    * Se o "Tipo" for `MATERIA_PRIMA`, exibe um formulário simples.
    * Se o "Tipo" for `PRODUTO_ACABADO`, revela campos adicionais para construir a **Ficha Técnica (Receita)**, permitindo ao usuário adicionar múltiplos componentes e suas quantidades.
    * **Navegação Automática:** Após o cadastro bem-sucedido, o usuário é automaticamente redirecionado para a "Lista de Produtos" para ver o seu novo item.

* **Formulários de Ação (Entrada e Produção):**
    * Formulários dedicados para "Dar Entrada no Estoque" e "Executar Ordem de Produção".
    * **Feedback ao Usuário:** Estes formulários exibem mensagens de sucesso (verdes) ou erro (vermelhas) em tempo real, comunicando diretamente o resultado das validações da API (ex: "Estoque insuficiente para...").

---

## 🛠️ Tecnologias (Frontend)

* **React 18**
* **Vite:** Para um ambiente de desenvolvimento rápido (Hot Reload) e build otimizado.
* **React Router (v6):** Para roteamento do lado do cliente (as "guias").
* **Axios:** Para fazer as chamadas HTTP (requisições) para a API do Backend.
* **CSS Moderno:** Estilização "sofisticada" com tema escuro, layout flexbox e componentes reutilizáveis.

---

## 🚀 Como Executar (Localmente)

**Requisitos:**
* [Node.js](https://nodejs.org/) (versão LTS recomendada)
* O **Backend (Control System)** deve estar em execução em `http://localhost:8080`.

**Passos:**
1.  Clone este repositório: `git clone https://github.com/jovvaz/control-system-frontend.git`
2.  Navegue até a pasta: `cd control-system-frontend`
3.  Instale todas as dependências:
    ```bash
    npm install
    ```
4.  Execute o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```
5.  Abra `http://localhost:5173` (ou a porta indicada) no seu navegador.
