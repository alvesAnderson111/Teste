import React, { useState } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { CalendarView } from './components/CalendarView';
import { DetailsForm } from './components/DetailsForm';
import { ReviewView } from './components/ReviewView';
import { ConfirmationModal } from './components/ConfirmationModal';
import { BookingStep, BookingData } from './types';

const INITIAL_DATA: BookingData = {
  date: null,
  address: '',
  areaType: null,
  customAreaSize: '',
  phone: ''
};

export default function App() {
  const [step, setStep] = useState<BookingStep>('splash');
  const [bookingData, setBookingData] = useState<BookingData>(INITIAL_DATA);
  const [bookedDates, setBookedDates] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Splash Screen Handler
  const handleSplashComplete = () => {
    setStep('calendar');
  };

  // Calendar Handler
  const handleDateSelect = (date: Date) => {
    setBookingData(prev => ({ ...prev, date }));
    setStep('details');
  };

  // Data Updates
  const updateBookingData = (updates: Partial<BookingData>) => {
    setBookingData(prev => ({ ...prev, ...updates }));
  };

  // Navigation
  const goBackToCalendar = () => setStep('calendar');
  const goBackToDetails = () => setStep('details');
  const goToReview = () => setStep('review');

  // Confirmation Flow
  const handleRequestConfirm = () => {
    setIsModalOpen(true);
  };

  const handleFinalConfirm = () => {
    if (bookingData.date) {
      // Add date to booked list
      setBookedDates(prev => [...prev, bookingData.date!.toDateString()]);
    }
    
    // Simulate API call / WhatsApp redirect
    console.log("Booking Confirmed:", bookingData);
    
    // Reset and return to start
    setIsModalOpen(false);
    setBookingData(INITIAL_DATA);
    setStep('calendar');
    
    // Optional: Show a quick toast or alert, but the flow requests returning to agenda immediately with grayed out date
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-64 h-64 bg-emerald-100/50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-80 h-80 bg-emerald-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-30 translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      {step === 'splash' && <SplashScreen onComplete={handleSplashComplete} />}

      <div className="relative z-10 py-6 md:py-12">
        {step !== 'splash' && (
          <header className="flex justify-center mb-4 md:mb-8 animate-fade-in">
            <div className="flex items-center gap-2 text-emerald-900 border-b-2 border-emerald-100 pb-2 px-4">
              <span className="font-mono font-bold text-2xl tracking-tighter">AJ</span>
              <span className="h-4 w-px bg-emerald-300 mx-1"></span>
              <span className="text-xs font-medium tracking-widest uppercase">Paisagismo</span>
            </div>
          </header>
        )}

        {step === 'calendar' && (
          <CalendarView 
            onDateSelect={handleDateSelect} 
            bookedDates={bookedDates} 
          />
        )}

        {step === 'details' && (
          <DetailsForm 
            data={bookingData} 
            onUpdate={updateBookingData}
            onNext={goToReview}
            onBack={goBackToCalendar}
          />
        )}

        {step === 'review' && (
          <ReviewView 
            data={bookingData}
            onUpdate={updateBookingData}
            onConfirm={handleRequestConfirm}
            onBack={goBackToDetails}
          />
        )}
      </div>

      <ConfirmationModal 
        isOpen={isModalOpen}
        onConfirm={handleFinalConfirm}
        onCancel={() => setIsModalOpen(false)}
      />
    </div>
  );
}