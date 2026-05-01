import { useState, useEffect } from 'react';
import '../styles/NoteForm.css';

export function NoteForm({ onSubmit, initialNote, onCancel }) {
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialNote) {
      setTitulo(initialNote.titulo || '');
      setTexto(initialNote.texto || '');
    }
  }, [initialNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo.trim() || !texto.trim()) {
      alert('Preencha título e texto');
      return;
    }

    setLoading(true);
    try {
      await onSubmit({ titulo, texto });
      setTitulo('');
      setTexto('');
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2>{initialNote ? 'Editar Nota' : 'Nova Nota'}</h2>
      
      <input
        type="text"
        placeholder="Título da nota"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        disabled={loading}
        className="input-titulo"
      />

      <textarea
        placeholder="Digite o conteúdo da nota..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        disabled={loading}
        className="input-texto"
        rows="8"
      />

      <div className="form-buttons">
        <button type="submit" disabled={loading} className="btn-save">
          {loading ? 'Salvando...' : initialNote ? 'Atualizar' : 'Criar'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} disabled={loading} className="btn-cancel">
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
