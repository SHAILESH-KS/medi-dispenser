import type { DispensingHistory } from '../types';
import { History, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { formatTime } from '../lib/utils';
import { cn } from '../lib/utils';

export function ActivityHistory({ history }: { history: DispensingHistory[] }) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'dispensed':
        return <CheckCircle2 className="w-5 h-5 text-soft-green" />;
      case 'failed':
      case 'missed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-amber-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'dispensed': return 'Successfully dispensed';
      case 'failed': return 'Failed to dispense';
      case 'missed': return 'Missed schedule';
      default: return 'Scheduled';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border-gray p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-text-navy flex items-center gap-2">
          <History className="w-4 h-4 text-medical-teal" />
          Today's Activity
        </h2>
      </div>

      <div className="space-y-4">
        {history.length === 0 ? (
          <p className="text-sm text-text-charcoal/70 text-center py-4">No activity recorded today.</p>
        ) : (
          <div className="relative border-l-2 border-border-gray ml-3 pl-5 space-y-6">
            {history.map((item) => (
              <div key={item.id} className="relative">
                <div className="absolute -left-[30px] top-1 bg-white">
                  {getStatusIcon(item.status)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-text-navy">{formatTime(item.dispensed_at)}</span>
                    <span className="text-xs font-medium text-text-charcoal/60 bg-bg-light px-2 py-0.5 rounded-full border border-border-gray/50">
                      Pos {item.position}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-text-charcoal mt-1">{item.medicine_name}</h4>
                  <p className={cn(
                    "text-xs mt-0.5 font-medium",
                    item.status === 'dispensed' ? "text-soft-green" : 
                    (item.status === 'scheduled' ? "text-amber-600" : "text-red-500")
                  )}>
                    {getStatusText(item.status)}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Mock upcoming activity */}
            <div className="relative">
              <div className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full border-2 border-border-gray bg-white"></div>
              <div>
                <span className="font-semibold text-text-charcoal/50">08:00 PM</span>
                <h4 className="text-sm font-medium text-text-charcoal/50 mt-1">Medicine C</h4>
                <p className="text-xs mt-0.5 font-medium text-text-charcoal/40">Scheduled</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
