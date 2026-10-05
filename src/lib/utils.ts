import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTime(timeString: string) {
  // Assuming timeString is HH:mm:ss
  const [hours, minutes] = timeString.split(':');
  const h = parseInt(hours, 10);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const displayHours = h % 12 || 12;
  return `${displayHours.toString().padStart(2, '0')}:${minutes} ${ampm}`;
}

export function calculateTimeRemaining(targetTime: string) {
  const now = new Date();
  const [hours, minutes] = targetTime.split(':').map(Number);
  
  let target = new Date(now);
  target.setHours(hours, minutes, 0, 0);

  if (target < now) {
    // If time has passed today, it's for tomorrow
    target.setDate(target.getDate() + 1);
  }

  const diffMs = target.getTime() - now.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (diffHrs === 0) {
    return `${diffMins}m`;
  }
  return `${diffHrs}h ${diffMins}m`;
}
