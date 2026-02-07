import React from 'react';
import { ArrowLeft, Calendar, MapPin, Ruler, Phone, CheckCircle } from 'lucide-react';
import { BookingData } from '../types';

interface ReviewViewProps {
  data: BookingData;
  onUpdate: (data: Partial<BookingData>) => void;
  onConfirm: () => void;
  onBack: () => void;
}

export const ReviewView: React.FC<ReviewViewProps> = ({ data, onUpdate, onConfirm, onBack }) => {
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getAreaText = () => {
    if (data.areaType === '200') return 'Até 200m²';
    if (data.areaType === '400') return 'Até 400m²';
    if (data.areaType === 'custom') return `${data.customAreaSize} (Personalizado)`;
    return 'Não informado';
  };

  const isFormValid = data.phone.length >= 10; // Basic validation

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in px-4 pb-24">
      <div className="flex items-center mb-6 pt-4">
        <button onClick={onBack} className="p-2 -ml-2 text-stone-500 hover:bg-stone-100 rounded-full">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-emerald-900 ml-2">Revisar Solicitação</h2>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden">
          <div className="bg-stone-100 px-5 py-3 border-b border-stone-200">
            <h3 className="text-sm font-mono text-stone-500 uppercase tracking-wider">Resumo</h3>
          </div>
          
          <div className="p-5 space-y-4">
            <div className="flex items-start gap-3">
              <Calendar className="text-emerald-600 mt-1 shrink-0" size={20} />
              <div>
                <p className="text-xs text-stone-500 font-medium">Data Escolhida</p>
                <p className="text-stone-800 capitalize">{formatDate(data.date)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Ruler className="text-emerald-600 mt-1 shrink-0" size={20} />
              <div>
                <p className="text-xs text-stone-500 font-medium">Tamanho da Área</p>
                <p className="text-stone-800">{getAreaText()}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="text-emerald-600 mt-1 shrink-0" size={20} />
              <div>
                <p className="text-xs text-stone-500 font-medium">Endereço</p>
                <p className="text-stone-800 text-sm leading-relaxed">{data.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100">
          <div className="flex items-center gap-2 mb-4 text-emerald-700">
            <Phone size={20} />
            <h3 className="font-semibold">Contato</h3>
          </div>
          <label className="block text-xs text-stone-500 mb-1 ml-1">Seu WhatsApp / Telefone</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => onUpdate({ phone: e.target.value })}
            placeholder="(00) 00000-0000"
            className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-lg font-mono"
          />
          <p className="text-xs text-stone-400 mt-2 px-1">
            Utilizaremos este número para enviar o orçamento final.
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-stone-100 md:relative md:bg-transparent md:border-0 md:p-0 md:mt-8">
        <button
          onClick={onConfirm}
          disabled={!isFormValid}
          className="w-full py-4 bg-emerald-800 text-white rounded-xl font-bold shadow-lg shadow-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-900 transition-colors flex items-center justify-center gap-2"
        >
          CONFIRMAR ORÇAMENTO
          <CheckCircle size={20} />
        </button>
      </div>
    </div>
  );
};