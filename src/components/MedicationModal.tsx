import { useState, useEffect } from 'react';
import type { MedicineSchedule, Position } from '../types';
import { X, Save, Pill } from 'lucide-react';
import { motion } from 'framer-motion';

interface MedicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (schedule: Omit<MedicineSchedule, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
  initialData?: MedicineSchedule | null;
}

export function MedicationModal({ isOpen, onClose, onSave, initialData }: MedicationModalProps) {
  const [formData, setFormData] = useState({
    medicine_name: '',
    dispense_time: '08:00',
    position: 'A' as Position,
    enabled: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        medicine_name: initialData.medicine_name,
        // Ensure format is HH:mm for the input type="time"
        dispense_time: initialData.dispense_time.substring(0, 5),
        position: initialData.position,
        enabled: initialData.enabled
      });
    } else {
      setFormData({
        medicine_name: '',
        dispense_time: '08:00',
        position: 'A',
        enabled: true
      });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave({
        ...formData,
        // append seconds for the db
        dispense_time: `${formData.dispense_time}:00`
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-text-navy/40 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative z-10"
      >
        <div className="flex justify-between items-center p-6 border-b border-border-gray bg-bg-light">
          <h2 className="text-xl font-bold text-text-navy flex items-center gap-2">
            <Pill className="w-5 h-5 text-medical-teal" />
            {initialData ? 'Edit Medication' : 'Add Medication'}
          </h2>
          <button 
            onClick={onClose}
            className="text-text-charcoal hover:text-text-navy hover:bg-border-gray/50 p-2 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label htmlFor="medicine_name" className="block text-sm font-semibold text-text-navy mb-1.5">
              Medicine Name
            </label>
            <input
              type="text"
              id="medicine_name"
              required
              value={formData.medicine_name}
              onChange={e => setFormData({ ...formData, medicine_name: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-border-gray focus:border-medical-teal focus:ring-2 focus:ring-medical-teal/20 outline-none transition-all"
              placeholder="e.g. Paracetamol"
            />
          </div>
          
          <div>
            <label htmlFor="dispense_time" className="block text-sm font-semibold text-text-navy mb-1.5">
              Dispensing Time
            </label>
            <input
              type="time"
              id="dispense_time"
              required
              value={formData.dispense_time}
              onChange={e => setFormData({ ...formData, dispense_time: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border border-border-gray focus:border-medical-teal focus:ring-2 focus:ring-medical-teal/20 outline-none transition-all"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-text-navy mb-2">
              Dispenser Position
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(['A', 'B', 'C'] as Position[]).map((pos) => (
                <label 
                  key={pos} 
                  className={`
                    cursor-pointer border rounded-xl py-3 flex flex-col items-center justify-center transition-all
                    ${formData.position === pos 
                      ? 'border-medical-teal bg-medical-teal/5 text-medical-teal ring-1 ring-medical-teal/30' 
                      : 'border-border-gray bg-white text-text-charcoal hover:bg-bg-light'}
                  `}
                >
                  <input
                    type="radio"
                    name="position"
                    value={pos}
                    checked={formData.position === pos}
                    onChange={() => setFormData({ ...formData, position: pos })}
                    className="sr-only"
                  />
                  <span className="text-xl font-bold mb-1">{pos}</span>
                  <span className="text-xs font-medium opacity-80">Position</span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="flex items-center pt-2">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input 
                  type="checkbox" 
                  className="sr-only" 
                  checked={formData.enabled}
                  onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                />
                <div className={`block w-14 h-8 rounded-full transition-colors ${formData.enabled ? 'bg-medical-teal' : 'bg-gray-300'}`}></div>
                <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform ${formData.enabled ? 'transform translate-x-6' : ''}`}></div>
              </div>
              <div className="ml-3 font-medium text-text-navy">
                Enable this schedule
              </div>
            </label>
          </div>
          
          <div className="pt-6 flex justify-end gap-3 border-t border-border-gray">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-text-charcoal font-medium hover:bg-bg-light rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-medical-teal hover:bg-medical-teal-dark text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <Save className="w-5 h-5" />
              )}
              {initialData ? 'Save Changes' : 'Save Medication'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
