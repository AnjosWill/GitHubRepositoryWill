# Will CashOut - Vue Project

## 📝 Description [Eng]
**Will CashOut** is an application developed in Vue.js to manage financial campaigns and payments. It includes a responsive interface, dynamic lists, and a simplified user experience.

## 🚀 Updated Features
- **Status Progression:** Campaign statuses are dynamically updated, and this progression is reflected in real-time on the campaign cards.
- **Dynamic Value Updates:** When a campaign is moved to "Available to Cash-out," the total cash-out value is automatically adjusted.
- **Search Filters:** Enables filtering campaigns by text and status, with support for searching by both name and brand.

## 📦 Project Structure
```plaintext
├── src/
│   ├── components/       # Reusable Vue components
│   │   ├── CampaignCard.vue
│   │   ├── CampaignSection.vue
│   │   ├── DashboardHeader.vue
│   │   ├── Dialog.vue
│   │   ├── FilterSection.vue
│   │   └── SummaryCards.vue
│   ├── config/           # Configuration files
│   │   └── constants.ts
│   ├── store/            # Vuex store
│   │   └── index.ts
│   ├── styles/           # Global styles
│   │   └── global.scss
│   ├── types/            # TypeScript definitions
│   │   ├── shims-images.d.ts
│   │   └── store.d.ts
│   ├── utils/            # Utility functions
│   │   └── interaction.ts
│   ├── views/            # Main application views
│   │   └── DashboardView.vue
│   ├── App.vue           # Root component
│   └── main.ts           # Application entry point
├── .gitignore            # Git ignored files
├── index.html            # Main HTML file
├── package.json          # Project dependencies and scripts
├── README.md             # Project documentation
├── tsconfig.json         # TypeScript configuration
└── vite.config.ts        # Vite configuration
```

## 🛠️ How to Run the Project

### 1. Prerequisites
Make sure you have installed:
- Node.js (version 16 or higher)
- Git

### 2. Installation
Clone this repository and install dependencies:
```bash
git clone https://github.com/AnjosWill/will_cashout_vue.git
cd will_cashout_vue
npm install
```

### 3. Running the Development Environment
To start the development server:
```bash
npm run dev
```
Access the project in your browser at: [http://localhost:5173](http://localhost:5173).

### 4. Building for Production
To generate the optimized production files:
```bash
npm run build
```
The files will be generated in the `dist/` folder.

### 5. Testing the Build
To preview the build locally:
```bash
npm run preview
```

## 🤝 Contributing
Contributions are welcome! Follow the steps:
1. Fork this project.
2. Create a branch for your feature:
```bash
git checkout -b my-feature
```
3. Commit your changes:
```bash
git commit -m 'Added a new feature'
```
4. Push to the branch:
```bash
git push origin my-feature
```
5. Open a Pull Request.

## 👨‍💻 Author
Developed by **Will Anjos**.

Contact:
- **Email**: anjos_willian@hotmail.com
- **LinkedIn**: [Willian Pereira dos Anjos](https://www.linkedin.com/in/willian-pereira-dos-anjos)


---

## 📝 Descrição [Pt-Br]
**Will CashOut** é um aplicativo desenvolvido em Vue.js para gerenciar campanhas financeiras e pagamentos. Ele inclui uma interface responsiva, listas dinâmicas e uma experiência de usuário simplificada.

## 🌟 Funcionalidades Atualizadas
- **Progressão de Status**: O status das campanhas é atualizado dinamicamente, e essa progressão é refletida em tempo real nos cartões de campanha.
- **Atualização de Valores Dinâmicos**: Quando uma campanha é movida para "Available to Cash-out", o valor total do saque é automaticamente ajustado.
- **Filtros de Pesquisa**: Permite filtrar campanhas por texto e status, com suporte à pesquisa tanto pelo nome quanto pela marca.

## 🚀 Tecnologias Utilizadas
- **Frontend**: [Vue.js 3](https://vuejs.org/)
- **Gerenciador de Pacotes**: [NPM](https://www.npmjs.com/)
- **Ferramenta de Build**: [Vite](https://vitejs.dev/)
- **Linter**: [ESLint](https://eslint.org/)
- **TypeScript**: Suporte completo para tipagem estática.

## 📦 Estrutura do Projeto
```plaintext
## 📦 Project Structure
├── src/
│   ├── components/       # Componentes reutilizáveis do Vue
│   │   ├── CampaignCard.vue
│   │   ├── CampaignSection.vue
│   │   ├── DashboardHeader.vue
│   │   ├── Dialog.vue
│   │   ├── FilterSection.vue
│   │   └── SummaryCards.vue
│   ├── config/           # Configurações gerais
│   │   └── constants.ts
│   ├── store/            # Gerenciamento de Store
│   │   └── index.ts
│   ├── styles/           # Estilos globais
│   │   └── global.scss
│   ├── types/            # Definições de tipos TypeScript e de Store
│   │   ├── shims-images.d.ts
│   │   └── store.d.ts
│   ├── utils/            # Funções utilitárias
│   │   └── interaction.ts
│   ├── views/            # Visão principal do aplicativo
│   │   └── DashboardView.vue
│   ├── App.vue           # Componente raiz
│   └── main.ts           # Ponto de entrada do aplicativo
├── index.html            # Arquivo HTML principal
├── package.json          # Dependências e scripts do projeto
├── README.md             # Documentação do projeto
├── tsconfig.json         # Configuração do TypeScript
└── vite.config.ts        # Configuração do Vite
```
## 🛠️ Como Rodar o Projeto

### 1. Pré-requisitos
Certifique-se de ter instalado:
- Node.js (versão 16 ou superior)
- Git

### 2. Instalação
Clone este repositório e instale as dependências:
```bash
git clone https://github.com/AnjosWill/will_cashout_vue.git
cd will_cashout_vue
npm install
```

### 3. Executando o Ambiente de Desenvolvimento
Para iniciar o servidor de desenvolvimento:
```bash
npm run dev
```

Acesse o projeto no navegador em: [http://localhost:5173](http://localhost:5173).

### 4. Gerar Build de Produção
Para gerar os arquivos otimizados de produção:
```bash
npm run build
```

Os arquivos serão gerados na pasta dist/.

### 5. Testando o Build
Para visualizar o build localmente:
```bash
npm run preview
```

## 🤝 Contribuindo
Contribuições são bem-vindas! Siga os passos:
1. Faça um fork deste projeto.
2. Crie uma branch para sua funcionalidade:
```bash
git checkout -b minha-funcionalidade
```

3. Faça commit de suas alterações:
```bash
git commit -m 'Adicionada uma nova funcionalidade'
```

4. Faça push para a branch:
```bash
git push origin minha-funcionalidade
```

5. Abra um Pull Request.

## 👨‍💻 Autor
Desenvolvido por **Will Anjos**.

Entre em contato:
- **Email**: anjos_willian@hotmail.com
- **LinkedIn**: [Willian Pereira dos Anjos](https://www.linkedin.com/in/willian-pereira-dos-anjos)
