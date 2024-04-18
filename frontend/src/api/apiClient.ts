const BASE_URL = 'http://localhost:3001';

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Algo salió mal con la petición');
  }
  return response.json();
};

export const getDuties = async () => {
  try {
    const response = await fetch(`${BASE_URL}/duties`);
    return handleResponse(response);
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    throw error;
  }
};

export const addDuty = async (name: string) => {
  try {
    const response = await fetch(`${BASE_URL}/duties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, completed: false }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al añadir la tarea:', error);
    throw error;
  }
};

export const updateDuty = async (id: string, name: string, completed: boolean) => {
  try {
    const response = await fetch(`${BASE_URL}/duties/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, completed }),
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    throw error;
  }
};

export const deleteDuty = async (id: string) => {
  try {
    const response = await fetch(`${BASE_URL}/duties/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    throw error;
  }
};
