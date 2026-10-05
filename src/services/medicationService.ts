import { supabase } from '../lib/supabase';
import type { MedicineSchedule, DispensingHistory } from '../types';

export const medicationService = {
  async getSchedules(): Promise<MedicineSchedule[]> {
    const { data, error } = await supabase
      .from('medicine_schedule')
      .select('*')
      .order('dispense_time', { ascending: true });

    if (error) {
      console.error('Error fetching schedules:', error);
      throw error;
    }

    return data || [];
  },

  async addSchedule(schedule: Omit<MedicineSchedule, 'id' | 'created_at' | 'updated_at'>): Promise<MedicineSchedule> {
    const { data, error } = await supabase
      .from('medicine_schedule')
      .insert([schedule])
      .select()
      .single();

    if (error) {
      console.error('Error adding schedule:', error);
      throw error;
    }

    return data;
  },

  async updateSchedule(id: string, updates: Partial<MedicineSchedule>): Promise<MedicineSchedule> {
    const { data, error } = await supabase
      .from('medicine_schedule')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating schedule:', error);
      throw error;
    }

    return data;
  },

  async deleteSchedule(id: string): Promise<void> {
    const { error } = await supabase
      .from('medicine_schedule')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting schedule:', error);
      throw error;
    }
  },

  async getDispensingHistory(): Promise<DispensingHistory[]> {
    const { data, error } = await supabase
      .from('dispensing_history')
      .select('*')
      .order('dispensed_at', { ascending: false })
      .limit(20);

    if (error) {
      console.error('Error fetching dispensing history:', error);
      throw error;
    }

    return data || [];
  }
};
