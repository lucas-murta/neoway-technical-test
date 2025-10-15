# Neoway Technical Test - Vue.js News Application

Este é um projeto de teste para avaliação de desenvolvimento Front-End em Vue.js, onde o desafio foi desenvolver uma aplicação SPA (Single Page Application) com uma lista de notícias na tela.

## 📋 Descrição do Projeto

A aplicação apresenta uma interface moderna e responsiva para visualização de notícias, permitindo aos usuários:
- Navegar por diferentes categorias de notícias
- Pesquisar artigos específicos
- Salvar artigos favoritos
- Alternar entre temas claro e escuro
- Navegar de forma acessível usando teclado

## 🏗️ Arquitetura do Projeto

```
src/
├── components/           # Componentes reutilizáveis
│   ├── base-components/  # Componentes base (Button, Typography, etc.)
│   └── components/       # Componentes específicos (Card, Header, etc.)
├── composables/          # Lógica reutilizável (useNews, useTheme, etc.)
├── constants/            # Constantes da aplicação
├── pages/               # Páginas da aplicação
│   ├── Home/            # Página inicial
│   ├── Category/        # Página de categoria
│   └── SavedArticles/   # Página de artigos salvos
├── router/              # Configuração de rotas
├── service/             # Serviços de API
├── stores/              # Gerenciamento de estado (Pinia)
├── styles/              # Estilos globais e tokens de design
├── types/               # Definições de tipos TypeScript
└── utils/               # Utilitários e helpers
```

### Tecnologias Utilizadas

- **Vue 3** com Composition API
- **TypeScript** para tipagem estática
- **Pinia** para gerenciamento de estado
- **Vue Router** para navegação
- **Vite** como bundler
- **Vitest** para testes unitários
- **Sass** para estilização
- **FontAwesome** para ícones

## 🚀 Como Iniciar o Projeto

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação e Execução

1. **Clone o repositório:**
```bash
git clone <repository-url>
cd neoway-technical-test
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
# Crie um arquivo .env na raiz do projeto
VITE_NEWS_API_KEY=sua_chave_da_newsapi
```

4. **Execute em modo de desenvolvimento:**
```bash
npm run dev
```

5. **Acesse a aplicação:**
Abra [http://localhost:5173](http://localhost:5173) no seu navegador

### Outros Comandos Disponíveis

```bash
# Build para produção
npm run build

# Executar testes
npm run test:unit

# Executar testes com cobertura
npm run test:ci

# Linting
npm run lint

# Preview da build de produção
npm run preview
```

## ♿ Critérios de Acessibilidade

A aplicação foi desenvolvida seguindo as melhores práticas de acessibilidade:

### Navegação por Teclado
- **Tab/Shift+Tab**: Navegação entre elementos interativos
- **Enter/Space**: Ativação de botões e links
- **Setas**: Navegação em componentes como autocomplete
- **Escape**: Fechamento de modais e dropdowns

### ARIA Labels e Semântica
- **aria-label**: Implementado em componentes como Card, Button e Typography
- **Roles semânticos**: Uso adequado de elementos HTML semânticos
- **Descrições acessíveis**: Labels descritivos para ações como "Save article" e "Remove from saved"

### Exemplos de Implementação:
```vue
<!-- Card Component -->
<article :aria-label="article.title">
  <button :aria-label="isArticleSaved ? 'Remove from saved' : 'Save article'">
    <!-- Conteúdo do botão -->
  </button>
</article>

<!-- Autocomplete Component -->
<input 
  @keydown="handleKeyDown"
  @focus="onFocus"
  aria-label="Search articles"
/>
```

## 🧪 Cobertura de Testes

O projeto possui uma suíte abrangente de testes unitários:

- **12 arquivos de teste** cobrindo componentes e composables
- **50 testes** executados com sucesso
- **Cobertura completa** dos componentes principais:
  - Componentes base (Button, Typography, Autocomplete, Toast)
  - Componentes específicos (Card, Header, Pagination)
  - Composables (useNews)
  - Stores (savedArticles)

### Executar Testes
```bash
# Testes em modo watch
npm run test:unit

# Testes com relatório de cobertura
npm run test:ci
```

## ⚠️ Limitações Conhecidas

### NewsAPI e GitHub Pages
A aplicação utiliza a NewsAPI para buscar notícias, porém existe uma limitação importante:

**A NewsAPI não funciona em GitHub Pages** devido às seguintes restrições:
- A API não permite requisições de domínios que não sejam localhost em planos gratuitos
- GitHub Pages serve conteúdo via HTTPS de domínios públicos
- Isso resulta em erros de CORS quando a aplicação tenta fazer requisições para a API

### Soluções Alternativas:
1. **Desenvolvimento Local**: A aplicação funciona perfeitamente em `localhost`
2. **Deploy em Outros Serviços**: Funciona em plataformas como Vercel, Netlify, etc.
3. **Proxy Server**: Implementação de um servidor proxy para contornar as limitações

### Demonstração Local:
Para visualizar o funcionamento completo da aplicação:
```bash
npm run dev
# Acesse http://localhost:5173
```

## 📱 Funcionalidades

- ✅ Lista de notícias por categoria
- ✅ Busca de artigos
- ✅ Sistema de favoritos
- ✅ Tema claro/escuro
- ✅ Design responsivo
- ✅ Navegação acessível
- ✅ Paginação
- ✅ Loading states
- ✅ Error handling

## 🎨 Design System

O projeto implementa um design system consistente com:
- **Tokens de design** para cores, espaçamentos e tipografia
- **Componentes reutilizáveis** com props tipadas
- **Temas** claro e escuro
- **Responsividade** para diferentes dispositivos

---

Desenvolvido como parte do teste técnico para avaliação de habilidades em Vue.js e desenvolvimento front-end moderno.
