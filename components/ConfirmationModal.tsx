import React from 'react';
import { MessageCircle, X } from 'lucide-react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm animate-fade-in"
        onClick={onCancel}
      />
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-slide-up transform transition-all">
        <button 
          onClick={onCancel}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center text-center mt-2">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
            <MessageCircle size={32} />
          </div>
          
          <h3 className="text-xl font-bold text-emerald-900 mb-2">Enviar Solicitação?</h3>
          
          <p className="text-stone-600 mb-6 text-sm leading-relaxed">
            Com a confirmação, iremos analisar seus dados e te enviar o valor do orçamento diretamente no seu WhatsApp. Deseja confirmar?
          </p>

          <div className="w-full space-y-3">
            <button
              onClick={onConfirm}
              className="w-full py-3 bg-emerald-600 text-white rounded-xl font-semibold shadow-md hover:bg-emerald-700 transition-colors"
            >
              Sim, Confirmar
            </button>
            <button
              onClick={onCancel}
              className="w-full py-3 bg-transparent text-stone-500 font-medium hover:text-stone-800 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};