# 📝 Aplicação de Notas Web

Uma aplicação web responsiva para gerenciar anotações, conectada com uma API de CRUD no Render.

## ✨ Funcionalidades

- ✅ **Listar Notas**: Visualize todas as suas anotações em cards organizados
- ✅ **Criar Nota**: Adicione novas anotações com título e conteúdo
- ✅ **Editar Nota**: Modifique o conteúdo de suas anotações existentes
- ✅ **Deletar Nota**: Remova anotações que não precisa mais
- ✅ **Interfaz Responsiva**: Design que funciona em desktop, tablet e mobile
- ✅ **Sincronização em Tempo Real**: Todos os dados são salvos na API

## 🚀 Como Usar

### Instalação e Execução

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Acesse a aplicação:**
   - Abra seu navegador e acesse: `http://localhost:5173/`

### Operações

#### Criar uma Nova Nota
1. Clique no botão **"+ Nova Nota"**
2. Preencha o **Título** e o **Conteúdo**
3. Clique em **"Criar"**

#### Editar uma Nota Existente
1. Clique no botão **"✏️ Editar"** no card da nota
2. Modifique o **Título** e/ou **Conteúdo**
3. Clique em **"Atualizar"**

#### Deletar uma Nota
1. Clique no botão **"🗑️ Deletar"** no card da nota
2. Confirme a deleção na caixa de diálogo

## 🏗️ Estrutura do Projeto

```
src/
├── components/
│   ├── NoteForm.jsx       # Componente de formulário para criar/editar
│   └── NoteList.jsx       # Componente para listar as notas
├── services/
│   └── notesService.js    # Serviço de integração com a API
├── styles/
│   ├── NoteForm.css       # Estilos do formulário
│   └── NoteList.css       # Estilos da lista de notas
├── App.jsx                # Componente principal
├── App.css                # Estilos da aplicação
├── main.jsx               # Ponto de entrada
└── index.css              # Estilos globais
```

## 🔌 API Integrada

A aplicação se conecta com a API de CRUD de anotações hospedada no Render:

- **Base URL**: `https://projeto-notas-imrd.onrender.com`
- **Endpoint**: `/api/notes`

### Estrutura de uma Nota

```json
{
  "id": "unique-id",
  "titulo": "Título da nota",
  "texto": "Conteúdo da nota",
  "criadoEm": "2026-05-01T18:54:47.887Z"
}
```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento (Vite)
- `npm run build` - Cria a build de produção
- `npm run lint` - Executa o linter (ESLint)
- `npm run preview` - Visualiza a build de produção

## 💻 Tecnologias Utilizadas

- **React 19.2.5** - Framework de UI
- **Vite 8.0.10** - Build tool e dev server
- **CSS3** - Estilos com design responsivo
- **Fetch API** - Requisições HTTP
- **JavaScript ES6+** - Linguagem de programação

## 🎨 Design

- **Tema**: Gradiente roxo moderno (#667eea para #764ba2)
- **Layout**: Grid responsivo que se adapta a diferentes tamanhos de tela
- **Animações**: Transições suaves em botões e cards
- **Acessibilidade**: Suporte completo a teclado e leitores de tela

## 📱 Responsividade

A aplicação é totalmente responsiva:
- **Desktop**: Layout em grid com até 3 colunas
- **Tablet**: Layout em grid com até 2 colunas
- **Mobile**: Layout em única coluna com toques otimizados

## 🐛 Tratamento de Erros

A aplicação possui tratamento robusto de erros:
- Mensagens de erro claras quando não conseguir conectar à API
- Confirmação antes de deletar uma nota
- Validação de campos obrigatórios no formulário
- Estados de carregamento durante operações

## 📝 Notas

- As anotações são sincronizadas com a API em tempo real
- Cada nota possui um ID único gerado pela API
- As datas são exibidas no formato brasileiro (DD/MM/YYYY)
- O contador de notas no rodapé é atualizado automaticamente

## 🚀 Deploy em Produção

Para fazer build da aplicação para produção:

```bash
npm run build
```

Isto criará uma pasta `dist/` com os arquivos otimizados prontos para deploy.

## 📧 Suporte

Se encontrar algum problema:
1. Verifique se a API do Render está acessível
2. Abra o console do navegador (F12) para ver mensagens de erro
3. Certifique-se de que todos as dependências estão instaladas

---

Desenvolvido com ❤️ usando React e Vite
