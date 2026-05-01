# 🔧 Documentação Técnica - Aplicação de Notas

## Visão Geral

A aplicação de notas foi desenvolvida como uma Single Page Application (SPA) usando React, com integração completa com uma API REST de CRUD hospedada no Render.

## Arquitetura da Aplicação

### Componentes

#### 1. **App.jsx** (Componente Principal)
- Gerencia o estado global da aplicação (notas, loading, erros)
- Coordena a comunicação entre componentes
- Implementa os handlers para criar, editar e deletar notas
- Renderiza o layout principal (header, main, footer)

**Estados principais:**
```javascript
const [notes, setNotes] = useState([]);           // Lista de notas
const [loading, setLoading] = useState(true);     // Estado de carregamento
const [editingNote, setEditingNote] = useState(null); // Nota sendo editada
const [showForm, setShowForm] = useState(false);   // Mostrar/esconder formulário
const [error, setError] = useState(null);         // Mensagens de erro
```

#### 2. **NoteForm.jsx** (Componente de Formulário)
- Renderiza o formulário para criar/editar notas
- Valida os campos antes de enviar
- Desabilita inputs durante o envio

**Props:**
- `onSubmit`: Função chamada ao submit do formulário
- `initialNote`: Dados da nota para edição (opcional)
- `onCancel`: Função chamada ao cancelar (opcional)

#### 3. **NoteList.jsx** (Componente de Lista)
- Renderiza a grid de notas
- Exibe estado de carregamento
- Exibe mensagem quando lista está vazia
- Fornece botões de editar e deletar

**Props:**
- `notes`: Array de notas para exibir
- `onEdit`: Função chamada ao clicar editar
- `onDelete`: Função chamada ao clicar deletar
- `loading`: Boolean indicando carregamento

### Serviço de API

#### notesService.js
Centraliza toda a comunicação com a API. Todos os métodos retornam promises e lidam com erros.

```javascript
notesService.getAllNotes()      // GET /api/notes
notesService.getNoteById(id)    // GET /api/notes/:id
notesService.createNote(data)   // POST /api/notes
notesService.updateNote(id, data) // PUT /api/notes/:id
notesService.deleteNote(id)     // DELETE /api/notes/:id
```

**Estrutura de erros:**
- Todos os métodos fazem try/catch
- Erros são logados no console
- Mensagens de erro são passadas ao usuário

## Fluxo de Dados

### Carregamento Inicial
```
App monta
  ↓
useEffect dispara loadNotes()
  ↓
notesService.getAllNotes()
  ↓
API retorna array de notas
  ↓
setNotes() atualiza estado
  ↓
Componentes re-renderizam com dados
```

### Criar Nota
```
Usuário clica "+ Nova Nota"
  ↓
setShowForm(true) mostra formulário
  ↓
Usuário preenche e clica "Criar"
  ↓
handleCreateNote() é chamado
  ↓
notesService.createNote(dados)
  ↓
API retorna nova nota com ID
  ↓
setNotes([newNote, ...notes])
  ↓
loadNotes() recarrega para sincronizar
  ↓
setShowForm(false) esconde formulário
```

### Editar Nota
```
Usuário clica "✏️ Editar"
  ↓
setEditingNote(note) + setShowForm(true)
  ↓
Formulário mostra dados da nota
  ↓
Usuário modifica e clica "Atualizar"
  ↓
handleCreateNote() verifica if(editingNote)
  ↓
notesService.updateNote(id, dados)
  ↓
API retorna nota atualizada
  ↓
setNotes() atualiza no array
  ↓
loadNotes() recarrega para sincronizar
  ↓
setEditingNote(null) + setShowForm(false)
```

### Deletar Nota
```
Usuário clica "🗑️ Deletar"
  ↓
window.confirm() pede confirmação
  ↓
Se OK: handleDeleteNote(id)
  ↓
notesService.deleteNote(id)
  ↓
setNotes(notes.filter(n => n.id !== id))
```

## Estilos

### App.css
- Define o layout principal (flexbox com 3 seções: header, main, footer)
- Estilos do header com gradiente
- Estilos do botão "+ Nova Nota"
- Estilos de mensagem de erro
- Media queries para responsividade

### NoteForm.css
- Estilos do formulário com gradiente roxo
- Inputs com focus styling
- Botões com hover effects
- Estados desabilitados durante envio

### NoteList.css
- Grid responsivo com auto-fill
- Cards com sombras e transições
- Botões de ação com cores distintas
- Truncamento de texto longo com ellipsis

### index.css
- Variáveis CSS globais (cores, fontes)
- Reset de estilos padrão
- Scrollbar customizada
- Dark mode support

## Tratamento de Erros

A aplicação implementa múltiplas camadas de tratamento de erro:

1. **Nível de Serviço**: try/catch em cada método
2. **Nível de Componente**: try/catch nos handlers
3. **Nível de UI**: Exibição de mensagens de erro
4. **Validação**: Checagem de campos antes de submit

## Performance

### Otimizações Implementadas

1. **Lazy Loading**: Componentes carregam apenas quando necessário
2. **State Optimization**: Estados bem definidos e pequenos
3. **Re-renders**: Apenas componentes afetados re-renderizam
4. **Fetch Efficiency**: Recarregamento após operações para sincronização

### Pontos de Melhoria Futuros

- Adicionar debouncing em buscas
- Implementar paginação
- Usar React Query para cache de dados
- Adicionar otimistic updates
- Implementar lazy loading de imagens

## Responsividade

### Breakpoints

- **Desktop**: > 768px - Grid com 3 colunas
- **Tablet**: 481px - 768px - Grid com 2 colunas  
- **Mobile**: ≤ 480px - Grid com 1 coluna

### Ajustes por Breakpoint

- Tamanho de fonte reduzido em mobile
- Padding e margin reduzidos
- Buttons e inputs otimizados para toque
- Formulário adapta altura do textarea

## Segurança

### Implementações

- **Input Validation**: Verificação de campos obrigatórios
- **HTTPS**: API usa HTTPS no Render
- **CORS**: API configurada para aceitar requisições
- **Sanitização**: React previne XSS automaticamente

### Considerações

- Não há autenticação (API pública)
- Todos podem ver/editar todas as notas
- Para produção, adicionar autenticação

## Integração com API

### Requisitos da API

- Base URL: `https://projeto-notas-imrd.onrender.com`
- Endpoint: `/api/notes`
- Métodos suportados: GET, POST, PUT, DELETE
- Content-Type: application/json

### Formato de Requisição

```javascript
// POST /api/notes
{
  "titulo": "string",
  "texto": "string"
}

// PUT /api/notes/:id
{
  "titulo": "string",
  "texto": "string"
}
```

### Formato de Resposta

```javascript
{
  "id": "uuid",
  "titulo": "string",
  "texto": "string",
  "criadoEm": "ISO 8601 date string"
}
```

## Troubleshooting

### Problema: "Erro ao carregar notas"
- Verifique se a API está online
- Abra o console (F12) e veja o erro específico
- Verifique a URL da API em notesService.js

### Problema: Notas não atualizam após ação
- Verifique a conexão de internet
- Recarregue a página (F5)
- Verifique se há erros no console

### Problema: Datas inválidas
- A API pode não estar retornando criadoEm
- O componente tratará como "Sem data"

## Próximos Passos para Expansão

1. **Autenticação**: Adicionar login/registro
2. **Categorias**: Permitir categorizar notas
3. **Busca**: Implementar busca de notas
4. **Tags**: Adicionar tags/labels
5. **Markdown**: Suporte a markdown nas notas
6. **Compartilhamento**: Permitir compartilhar notas
7. **Export**: Exportar notas em PDF/txt
8. **Notificações**: Sistema de notificações

## Referências

- [React Docs](https://react.dev/)
- [Vite Docs](https://vitejs.dev/)
- [MDN Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)
