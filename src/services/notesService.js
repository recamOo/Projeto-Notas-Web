const API_BASE_URL = 'https://projeto-notas-imrd.onrender.com/api/notes';

export const notesService = {
  // Obter todas as notas
  async getAllNotes() {
    try {
      const response = await fetch(API_BASE_URL);
      if (!response.ok) throw new Error('Erro ao buscar notas');
      return await response.json();
    } catch (error) {
      console.error('Erro:', error);
      throw error;
    }
  },

  // Obter uma nota por ID
  async getNoteById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) throw new Error('Nota não encontrada');
      return await response.json();
    } catch (error) {
      console.error('Erro:', error);
      throw error;
    }
  },

  // Criar nova nota
  async createNote(data) {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erro ao criar nota');
      return await response.json();
    } catch (error) {
      console.error('Erro:', error);
      throw error;
    }
  },

  // Atualizar nota
  async updateNote(id, data) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Erro ao atualizar nota');
      return await response.json();
    } catch (error) {
      console.error('Erro:', error);
      throw error;
    }
  },

  // Deletar nota
  async deleteNote(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Erro ao deletar nota');
      return await response.json();
    } catch (error) {
      console.error('Erro:', error);
      throw error;
    }
  },
};
