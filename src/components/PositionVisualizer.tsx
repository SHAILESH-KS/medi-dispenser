import type { MedicineSchedule } from '../types';
import { formatTime } from '../lib/utils';
import { Settings } from 'lucide-react';

export function PositionVisualizer({ schedules }: { schedules: MedicineSchedule[] }) {
  const getScheduleForPosition = (pos: 'A' | 'B' | 'C') => {
    return schedules.find(s => s.position === pos && s.enabled);
  };

  const positions: Array<'A' | 'B' | 'C'> = ['A', 'B', 'C'];

  return (
    <section className="bg-white rounded-2xl shadow-sm border border-border-gray p-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-5 h-5 text-medical-teal" />
        <h2 className="text-xl font-semibold text-text-navy">Dispenser Positions</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {positions.map((pos) => {
          const schedule = getScheduleForPosition(pos);
          
          return (
            <div key={pos} className="bg-bg-light rounded-xl p-5 border border-border-gray relative overflow-hidden flex flex-col h-full">
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-border-gray/50 to-transparent rounded-bl-3xl opacity-50"></div>
              
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="w-8 h-8 rounded-full bg-white text-text-navy font-bold flex items-center justify-center shadow-sm border border-border-gray text-sm">
                  {pos}
                </div>
                {schedule && (
                  <span className="w-2 h-2 rounded-full bg-medical-teal"></span>
                )}
              </div>

              <div className="relative z-10 mt-auto">
                {schedule ? (
                  <>
                    <h3 className="font-semibold text-text-navy truncate" title={schedule.medicine_name}>
                      {schedule.medicine_name}
                    </h3>
                    <p className="text-sm text-text-charcoal mt-1 font-medium">
                      {formatTime(schedule.dispense_time)}
                    </p>
                  </>
                ) : (
                  <>
                    <h3 className="font-medium text-text-charcoal/50">Empty</h3>
                    <p className="text-sm text-text-charcoal/40 mt-1">Available</p>
                  </>
                )}
              </div>
              
              {/* Decorative hardware lines to imply physical connection */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-border-gray rounded-t-md"></div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
