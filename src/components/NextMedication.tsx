import { useEffect, useState } from 'react';
import type { MedicineSchedule } from '../types';
import { calculateTimeRemaining, formatTime } from '../lib/utils';
import { Pill, Clock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function NextMedication({ schedules }: { schedules: MedicineSchedule[] }) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  // Find the next upcoming medication
  const getNextMedication = () => {
    if (!schedules || schedules.length === 0) return null;
    
    const activeSchedules = schedules.filter(s => s.enabled);
    if (activeSchedules.length === 0) return null;



    let next = null;
    let smallestDiff = Infinity;

    for (const schedule of activeSchedules) {
      const [hours, minutes] = schedule.dispense_time.split(':').map(Number);
      
      let scheduleTime = new Date(now);
      scheduleTime.setHours(hours, minutes, 0, 0);

      // If time has passed today, it's for tomorrow
      if (scheduleTime < now) {
        scheduleTime.setDate(scheduleTime.getDate() + 1);
      }

      const diff = scheduleTime.getTime() - now.getTime();
      
      if (diff > 0 && diff < smallestDiff) {
        smallestDiff = diff;
        next = schedule;
      }
    }

    return next;
  };

  const nextMedication = getNextMedication();

  if (!nextMedication) {
    return (
      <div className="bg-gradient-to-br from-medical-teal to-medical-teal-dark rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-white/80 font-medium text-sm tracking-wide uppercase mb-2">Next Medication</h2>
          <p className="text-2xl font-semibold">No upcoming medications</p>
          <p className="text-white/70 mt-2">All caught up or no active schedules.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-medical-teal to-medical-teal-dark rounded-3xl p-6 md:p-8 text-white shadow-lg relative overflow-hidden"
    >
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-medical-teal-light/20 rounded-full blur-2xl"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white/80 font-medium text-sm tracking-wide uppercase flex items-center gap-2">
            <Pill className="w-4 h-4" /> Next Medication
          </h2>
          <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            Position {nextMedication.position}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h3 className="text-4xl md:text-5xl font-bold mb-2 tracking-tight">
              {nextMedication.medicine_name}
            </h3>
            <div className="flex items-center gap-2 text-white/90 font-medium text-lg">
              <Clock className="w-5 h-5" />
              {formatTime(nextMedication.dispense_time)}
            </div>
          </div>
          
          <div className="bg-white text-medical-teal-dark px-6 py-4 rounded-2xl flex items-center gap-4 shadow-sm border border-white/20 w-fit">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-medical-teal/70 mb-1">Dispensing in</p>
              <p className="text-2xl font-bold leading-none">{calculateTimeRemaining(nextMedication.dispense_time)}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-medical-teal-light/20 flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-medical-teal" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
