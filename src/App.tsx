import { useState, useEffect } from 'react';
import { Plus, Clock } from 'lucide-react';
import { medicationService } from './services/medicationService';
import type { MedicineSchedule, DeviceStatus, DispensingHistory } from './types';

import { Header } from './components/Header';
import { NextMedication } from './components/NextMedication';
import { ScheduleList } from './components/ScheduleList';
import { DeviceStatusCard } from './components/DeviceStatusCard';
import { PositionVisualizer } from './components/PositionVisualizer';
import { ActivityHistory } from './components/ActivityHistory';
import { MedicationModal } from './components/MedicationModal';

function App() {
  const [schedules, setSchedules] = useState<MedicineSchedule[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState<MedicineSchedule | null>(null);

  // Mock device status
  const deviceStatus: DeviceStatus = {
    device_name: 'Dispenser Unit 1',
    wifi_status: 'Connected',
    rtc_status: 'Synchronized',
    servo_status: 'Ready',
    display_status: 'Ready',
    buzzer_status: 'Ready',
    last_seen: 'Just now'
  };

  // Mock history
  const history: DispensingHistory[] = [
    {
      id: '1',
      medicine_id: 'mock1',
      medicine_name: 'Paracetamol',
      dispensed_at: '08:00:00',
      position: 'A',
      status: 'dispensed',
      created_at: new Date().toISOString()
    }
  ];

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    setIsLoading(true);
    try {
      const data = await medicationService.getSchedules();
      setSchedules(data);
    } catch (error) {
      console.error('Failed to fetch schedules', error);
      // Fallback for development if Supabase isn't configured yet
      if (schedules.length === 0) {
        setSchedules([
          { id: '1', medicine_name: 'Paracetamol', dispense_time: '08:00:00', position: 'A', enabled: true },
          { id: '2', medicine_name: 'Vitamin D', dispense_time: '13:00:00', position: 'B', enabled: true },
        ]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (scheduleData: Omit<MedicineSchedule, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (editingSchedule) {
        await medicationService.updateSchedule(editingSchedule.id, scheduleData);
      } else {
        await medicationService.addSchedule(scheduleData);
      }
      await fetchSchedules();
      setIsModalOpen(false);
      setEditingSchedule(null);
    } catch (error) {
      console.error('Failed to save schedule', error);
      alert('Failed to save medication. Please check your connection.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this medication schedule?')) {
      try {
        await medicationService.deleteSchedule(id);
        await fetchSchedules();
      } catch (error) {
        console.error('Failed to delete schedule', error);
      }
    }
  };

  const handleToggle = async (id: string, enabled: boolean) => {
    try {
      // Optimistic update
      setSchedules(schedules.map(s => s.id === id ? { ...s, enabled } : s));
      await medicationService.updateSchedule(id, { enabled });
    } catch (error) {
      console.error('Failed to toggle schedule', error);
      // Revert on error
      await fetchSchedules();
    }
  };

  const openAddModal = () => {
    setEditingSchedule(null);
    setIsModalOpen(true);
  };

  const openEditModal = (schedule: MedicineSchedule) => {
    setEditingSchedule(schedule);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-bg-light font-sans text-text-charcoal flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            <NextMedication schedules={schedules} />
            
            <section className="bg-white rounded-2xl shadow-sm border border-border-gray p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-text-navy flex items-center gap-2">
                  <Clock className="w-5 h-5 text-medical-teal" />
                  Today's Schedule
                </h2>
                <button 
                  onClick={openAddModal}
                  className="bg-medical-teal hover:bg-medical-teal-dark text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Medication
                </button>
              </div>
              
              <ScheduleList 
                schedules={schedules} 
                isLoading={isLoading} 
                onEdit={openEditModal}
                onDelete={handleDelete}
                onToggle={handleToggle}
              />
            </section>
            
            <PositionVisualizer schedules={schedules} />
          </div>
          
          {/* Sidebar Column */}
          <div className="space-y-6 lg:space-y-8">
            <DeviceStatusCard status={deviceStatus} />
            <ActivityHistory history={history} />
          </div>
        </div>
      </main>
      
      {isModalOpen && (
        <MedicationModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          initialData={editingSchedule}
        />
      )}
    </div>
  );
}

export default App;
