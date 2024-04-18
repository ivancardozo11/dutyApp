import React, { useEffect, useState } from 'react';
import { DutyList, Duty  } from './components/DutyList';
import DutyForm from './components/DutyForm';
import { getDuties, updateDuty, deleteDuty } from './api/apiClient';

const App: React.FC = () => {
  const [duties, setDuties] = useState<Duty[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);


  useEffect(() => {
    const fetchDuties = async () => {
      const fetchedDuties = await getDuties();
      setDuties(fetchedDuties);
    };

    fetchDuties();
  }, []);

  const handleCompleteDuty = async (id: string) => {
    try {
      const dutyToToggle = duties.find((duty) => duty.id === id);
      if (!dutyToToggle) {
        throw new Error('Duty not found');
      }
  
      const updatedDuty = await updateDuty(id, dutyToToggle.name, !dutyToToggle.completed);
  
      setDuties(duties.map((duty) => (duty.id === id ? updatedDuty : duty)));
    } catch (error) {
      console.error('Error updating duty:', error);
    }
  };

  const handleDeleteDuty = async (id: string) => {
    try {
      await deleteDuty(id);
      
      setDuties(duties.filter(duty => duty.id !== id));
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  const handleDutiesUpdated = (newDuty: Duty) => {
    setDuties(prevDuties => [...prevDuties, newDuty]);
  };

  const startEditing = (id: string) => {
    setEditingId(id);
  };

  const cancelEditing = () => {
    setEditingId(null);
  };


  const handleSave = async (id: string, newName: string) => {
    try {
      const currentDuty = duties.find(duty => duty.id === id);
      if (!currentDuty) {
        throw new Error('Duty not found');
      }
  
      const updatedDuty = await updateDuty(id, newName, currentDuty.completed);
      
      setDuties(duties.map(duty => (duty.id === id ? updatedDuty : duty)));
      
      setEditingId(null);
    } catch (error) {
      console.error('Error saving duty:', error);
    }
  };
  

  return (
    <div>
      <h1>DutyApp⏰</h1>
      <DutyForm onDutiesUpdated={handleDutiesUpdated} />
      <DutyList 
        duties={duties} 
        onComplete={handleCompleteDuty} 
        onDelete={handleDeleteDuty}
        onEditStart={startEditing}
        onEditCancel={cancelEditing}
        editingId={editingId}
        onSave={handleSave}
      />
    </div>
  );
};

export default App;
