import type { DeviceStatus } from '../types';
import { Wifi, Clock, Settings, Monitor, Bell, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

export function DeviceStatusCard({ status }: { status: DeviceStatus }) {
  const isOnline = status.wifi_status === 'Connected';

  const StatusItem = ({ icon: Icon, label, value, isGood }: any) => (
    <div className="flex items-center justify-between py-3 border-b border-border-gray/50 last:border-0">
      <div className="flex items-center gap-3 text-text-charcoal">
        <Icon className="w-4 h-4 text-text-charcoal/60" />
        <span className="text-sm font-medium">{label}</span>
      </div>
      <span className={cn(
        "text-xs font-semibold px-2.5 py-1 rounded-full",
        isGood ? "bg-soft-green/10 text-soft-green" : "bg-amber-100 text-amber-600"
      )}>
        {value}
      </span>
    </div>
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-border-gray overflow-hidden">
      <div className="p-5 bg-bg-light border-b border-border-gray flex items-center justify-between">
        <h2 className="text-sm font-bold uppercase tracking-wider text-text-navy flex items-center gap-2">
          <Activity className="w-4 h-4 text-medical-teal" />
          Device Status
        </h2>
        <div className="flex items-center gap-2">
          <div className={cn("w-2 h-2 rounded-full", isOnline ? "bg-soft-green animate-pulse" : "bg-red-500")}></div>
          <span className="text-xs font-semibold text-text-charcoal">
            {isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <StatusItem 
          icon={Wifi} 
          label="Wi-Fi" 
          value={status.wifi_status} 
          isGood={status.wifi_status === 'Connected'} 
        />
        <StatusItem 
          icon={Clock} 
          label="RTC Module" 
          value={status.rtc_status} 
          isGood={status.rtc_status === 'Synchronized'} 
        />
        <StatusItem 
          icon={Settings} 
          label="Servo Motor" 
          value={status.servo_status} 
          isGood={status.servo_status === 'Ready'} 
        />
        <StatusItem 
          icon={Monitor} 
          label="Display" 
          value={status.display_status} 
          isGood={status.display_status === 'Ready'} 
        />
        <StatusItem 
          icon={Bell} 
          label="Buzzer" 
          value={status.buzzer_status} 
          isGood={status.buzzer_status === 'Ready'} 
        />
        
        <div className="mt-4 pt-4 border-t border-border-gray flex justify-between items-center text-xs text-text-charcoal/70">
          <span>Last Seen</span>
          <span className="font-medium">{status.last_seen}</span>
        </div>
      </div>
    </div>
  );
}
