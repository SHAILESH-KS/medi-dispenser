import type { DispensingHistory } from '../types';
import { History, CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { format, parseISO } from 'date-fns';

interface ActivityHistoryProps {
  history: DispensingHistory[];
  isLoading?: boolean;
}

export function ActivityHistory({ history, isLoading = false }: ActivityHistoryProps) {
  const formatDisplayTime = (isoString: string) => {
    try {
      return format(parseISO(isoString), 'hh:mm aa');
    } catch {
      return isoString;
    }
  };

  const getStatusIcon = (status: string) => {
    if (status === 'success') {
      return <CheckCircle2 className="w-5 h-5 text-soft-green" />;
    }
    return <XCircle className="w-5 h-5 text-red-500" />;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border-gray p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-text-navy flex items-center gap-2">
          <History className="w-4 h-4 text-medical-teal" />
          Dispensing History
        </h2>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-14 bg-border-gray/30 rounded-lg animate-pulse" />
          ))}
        </div>
      ) : history.length === 0 ? (
        <p className="text-sm text-text-charcoal/70 text-center py-6">
          No dispensing events recorded yet.
        </p>
      ) : (
        <div className="relative border-l-2 border-border-gray ml-3 pl-5 space-y-6">
          {history.map((item) => (
            <div key={item.id} className="relative">
              <div className="absolute -left-[30px] top-1 bg-white">
                {getStatusIcon(item.status)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-text-navy">
                    {formatDisplayTime(item.dispensed_at)}
                  </span>
                  <span className="text-xs font-medium text-text-charcoal/60 bg-bg-light px-2 py-0.5 rounded-full border border-border-gray/50">
                    Pos {item.position}
                  </span>
                </div>
                <h4 className="text-sm font-medium text-text-charcoal mt-1">
                  {item.medicine_name}
                </h4>
                <p className={cn(
                  'text-xs mt-0.5 font-medium',
                  item.status === 'success' ? 'text-soft-green' : 'text-red-500'
                )}>
                  {item.status === 'success' ? 'Successfully dispensed' : 'Failed to dispense'}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
