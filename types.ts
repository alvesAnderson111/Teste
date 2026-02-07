export type BookingStep = 'splash' | 'calendar' | 'details' | 'review';

export interface BookingData {
  date: Date | null;
  address: string;
  areaType: '200' | '400' | 'custom' | null;
  customAreaSize: string;
  phone: string;
}

export interface DayInfo {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isPast: boolean;
}
