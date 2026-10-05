import { Pill } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-border-gray sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-medical-teal-light/20 p-2 rounded-lg">
            <Pill className="w-6 h-6 text-medical-teal" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-navy leading-tight">MediDispenser</h1>
            <p className="text-xs text-text-charcoal font-medium">Smart Medication System</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 bg-soft-green/10 text-soft-green px-3 py-1.5 rounded-full text-sm font-medium">
            <div className="w-2 h-2 rounded-full bg-soft-green animate-pulse"></div>
            Device Online
          </div>
          <div className="w-9 h-9 rounded-full bg-border-gray flex items-center justify-center text-text-navy font-semibold text-sm border-2 border-white shadow-sm overflow-hidden">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=f8fafc" alt="User Avatar" />
          </div>
        </div>
      </div>
    </header>
  );
}
