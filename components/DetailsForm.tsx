import React, { useState } from 'react';
import { ArrowLeft, MapPin, Ruler } from 'lucide-react';
import { BookingData } from '../types';

interface DetailsFormProps {
  data: BookingData;
  onUpdate: (data: Partial<BookingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const DetailsForm: React.FC<DetailsFormProps> = ({ data, onUpdate, onNext, onBack }) => {
  const canProceed = data.address.trim().length > 5 && (data.areaType === 'custom' ? data.customAreaSize.length > 0 : !!data.areaType);

  return (
    <div className="w-full max-w-md mx-auto animate-fade-in px-4 pb-24">
      <div className="flex items-center mb-6 pt-4">
        <button onClick={onBack} className="p-2 -ml-2 text-stone-500 hover:bg-stone-100 rounded-full">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-xl font-bold text-emerald-900 ml-2">Detalhes da Área</h2>
      </div>

      <div className="space-y-6">
        {/* Address Section */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100">
          <div className="flex items-center gap-2 mb-3 text-emerald-700">
            <MapPin size={20} />
            <h3 className="font-semibold">Endereço</h3>
          </div>
          <textarea
            value={data.address}
            onChange={(e) => onUpdate({ address: e.target.value })}
            placeholder="Rua, Número, Bairro e Ponto de Referência"
            className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none resize-none h-24 text-sm"
          />
        </div>

        {/* Area Size Section */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-stone-100">
          <div className="flex items-center gap-2 mb-4 text-emerald-700">
            <Ruler size={20} />
            <h3 className="font-semibold">Tamanho da Área</h3>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => onUpdate({ areaType: '200' })}
              className={`w-full p-4 rounded-xl border text-left transition-all ${
                data.areaType === '200' 
                  ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500' 
                  : 'border-stone-200 hover:border-emerald-300 bg-stone-50'
              }`}
            >
              <div className="font-semibold text-stone-800">Pequeno / Médio</div>
              <div className="text-sm text-stone-500">Até 200m²</div>
            </button>

            <button
              onClick={() => onUpdate({ areaType: '400' })}
              className={`w-full p-4 rounded-xl border text-left transition-all ${
                data.areaType === '400' 
                  ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500' 
                  : 'border-stone-200 hover:border-emerald-300 bg-stone-50'
              }`}
            >
              <div className="font-semibold text-stone-800">Grande</div>
              <div className="text-sm text-stone-500">Até 400m²</div>
            </button>

            <button
              onClick={() => onUpdate({ areaType: 'custom' })}
              className={`w-full p-4 rounded-xl border text-left transition-all ${
                data.areaType === 'custom' 
                  ? 'border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500' 
                  : 'border-stone-200 hover:border-emerald-300 bg-stone-50'
              }`}
            >
              <div className="font-semibold text-stone-800">Personalizado</div>
              <div className="text-sm text-stone-500">Outra metragem</div>
            </button>

            {data.areaType === 'custom' && (
              <div className="mt-3 animate-fade-in">
                <label className="text-xs text-stone-500 ml-1">Informe a metragem aproximada:</label>
                <input
                  type="text"
                  value={data.customAreaSize}
                  onChange={(e) => onUpdate({ customAreaSize: e.target.value })}
                  placeholder="Ex: 850m²"
                  className="w-full mt-1 p-3 bg-white border border-stone-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-stone-100 md:relative md:bg-transparent md:border-0 md:p-0 md:mt-8">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="w-full py-4 bg-emerald-800 text-white rounded-xl font-semibold shadow-lg shadow-emerald-900/20 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-900 transition-colors"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};