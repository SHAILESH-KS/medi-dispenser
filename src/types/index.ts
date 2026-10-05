export type Position = 'A' | 'B' | 'C';

export interface MedicineSchedule {
  id: string;
  medicine_name: string;
  dispense_time: string; // Time format HH:mm:ss
  position: Position;
  enabled: boolean;
  created_at?: string;
  updated_at?: string;
}

export type DispensingStatus = 'success' | 'failed';

export interface DispensingHistory {
  id: string;
  medicine_name: string;
  position: Position;
  dispensed_at: string;
  status: DispensingStatus;
}

export interface DeviceStatus {
  id?: string;
  device_name: string;
  wifi_status: 'Connected' | 'Disconnected' | 'Connecting';
  rtc_status: 'Synchronized' | 'Out of Sync' | 'Error';
  servo_status: 'Ready' | 'Moving' | 'Error';
  display_status: 'Ready' | 'Error';
  buzzer_status: 'Ready' | 'Error';
  last_seen: string;
  updated_at?: string;
}
