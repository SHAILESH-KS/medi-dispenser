import type { MedicineSchedule } from '../types';
import { formatTime, cn } from '../lib/utils';
import { Pill, Edit2, Trash2, Power } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ScheduleListProps {
  schedules: MedicineSchedule[];
  isLoading: boolean;
  onEdit: (schedule: MedicineSchedule) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string, enabled: boolean) => void;
}

export function ScheduleList({ schedules, isLoading, onEdit, onDelete, onToggle }: ScheduleListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-20 bg-border-gray/30 rounded-xl animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (schedules.length === 0) {
    return (
      <div className="text-center py-12 px-4 rounded-xl border border-dashed border-border-gray bg-bg-light/50">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-border-gray">
          <Pill className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-medium text-text-navy mb-1">No medications scheduled yet</h3>
        <p className="text-text-charcoal/70 text-sm">Add your first medication to get started.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {schedules.map((schedule) => (
          <motion.div
            key={schedule.id}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={cn(
              "group flex items-center justify-between p-4 rounded-xl border transition-all duration-200",
              schedule.enabled 
                ? "bg-white border-border-gray shadow-sm hover:border-medical-teal/30" 
                : "bg-bg-light border-transparent opacity-60 grayscale-[0.3]"
            )}
          >
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-colors",
                schedule.enabled ? "bg-medical-teal/10 text-medical-teal" : "bg-gray-200 text-gray-500"
              )}>
                {schedule.position}
              </div>
              
              <div>
                <h4 className="font-semibold text-text-navy text-lg">{schedule.medicine_name}</h4>
                <div className="flex items-center gap-3 text-sm text-text-charcoal">
                  <span className="font-medium">{formatTime(schedule.dispense_time)}</span>
                  <span className="w-1 h-1 rounded-full bg-border-gray"></span>
                  <span className={schedule.enabled ? "text-soft-green font-medium" : "text-gray-500"}>
                    {schedule.enabled ? 'Active' : 'Disabled'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={() => onToggle(schedule.id, !schedule.enabled)}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  schedule.enabled ? "hover:bg-amber-100 text-amber-600" : "hover:bg-soft-green/20 text-soft-green"
                )}
                title={schedule.enabled ? "Disable" : "Enable"}
              >
                <Power className="w-4 h-4" />
              </button>
              
              <button 
                onClick={() => onEdit(schedule)}
                className="p-2 rounded-lg hover:bg-medical-teal/10 text-medical-teal transition-colors"
                title="Edit"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              
              <button 
                onClick={() => onDelete(schedule.id)}
                className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
