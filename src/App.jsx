import { useState, useEffect } from 'react';
import { NoteForm } from './components/NoteForm';
import { NoteList } from './components/NoteList';
import { notesService } from './services/notesService';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingNote, setEditingNote] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState(null);

  // Carregar notas ao montar o componente
  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await notesService.getAllNotes();
      setNotes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Erro ao carregar notas:', error);
      setError('Erro ao carregar notas. Verifique sua conexão.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (noteData) => {
    try {
      if (editingNote) {
        // Atualizar nota existente
        const updated = await notesService.updateNote(editingNote.id, noteData);
        setNotes(notes.map(n => n.id === editingNote.id ? updated : n));
        setEditingNote(null);
      } else {
        // Criar nova nota
        const newNote = await notesService.createNote(noteData);
        setNotes([newNote, ...notes]);
      }
      setShowForm(false);
      await loadNotes(); // Recarregar para garantir sincronização
    } catch (error) {
      console.error('Erro:', error);
      setError('Erro ao salvar nota.');
      alert('Erro ao salvar nota. Tente novamente.');
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleDeleteNote = async (id) => {
    try {
      await notesService.deleteNote(id);
      setNotes(notes.filter(n => n.id !== id));
    } catch (error) {
      console.error('Erro:', error);
      setError('Erro ao deletar nota.');
      alert('Erro ao deletar nota. Tente novamente.');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingNote(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-content">
          <h1>📝 Minhas Notas</h1>
          <p>Organize suas ideias e pensamentos</p>
        </div>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-message">
            ⚠️ {error}
            <button onClick={() => setError(null)} className="close-error">✕</button>
          </div>
        )}

        {showForm ? (
          <NoteForm
            onSubmit={handleCreateNote}
            initialNote={editingNote}
            onCancel={handleCancel}
          />
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="btn-new-note"
          >
            + Nova Nota
          </button>
        )}

        <NoteList
          notes={notes}
          onEdit={handleEditNote}
          onDelete={handleDeleteNote}
          loading={loading}
        />
      </main>

      <footer className="app-footer">
        <p>Total de notas: <strong>{notes.length}</strong></p>
      </footer>
    </div>
  );
}

export default App;
