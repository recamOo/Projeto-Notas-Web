import '../styles/NoteList.css';

export function NoteList({ notes, onEdit, onDelete, loading }) {
  if (loading) {
    return <div className="loading">Carregando notas...</div>;
  }

  if (notes.length === 0) {
    return <div className="empty-state">Nenhuma nota criada ainda. Crie sua primeira nota!</div>;
  }

  return (
    <div className="notes-grid">
      {notes.map((note) => (
        <div key={note.id} className="note-card">
          <div className="note-header">
            <h3 className="note-titulo">{note.titulo}</h3>
            <span className="note-date">
              {note.criadoEm 
                ? new Date(note.criadoEm).toLocaleDateString('pt-BR', { timeZone: 'UTC' })
                : 'Sem data'
              }
            </span>
          </div>

          <p className="note-texto">{note.texto}</p>

          <div className="note-actions">
            <button
              onClick={() => onEdit(note)}
              className="btn-edit"
              title="Editar nota"
            >
              ✏️ Editar
            </button>
            <button
              onClick={() => {
                if (window.confirm('Tem certeza que deseja deletar esta nota?')) {
                  onDelete(note.id);
                }
              }}
              className="btn-delete"
              title="Deletar nota"
            >
              🗑️ Deletar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
