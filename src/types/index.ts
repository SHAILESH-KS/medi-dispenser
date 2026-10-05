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

export type DispensingStatus = 'dispensed' | 'failed' | 'missed' | 'scheduled';

export interface DispensingHistory {
  id: string;
  medicine_id: string;
  medicine_name: string;
  dispensed_at: string;
  position: Position;
  status: DispensingStatus;
  created_at: string;
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
