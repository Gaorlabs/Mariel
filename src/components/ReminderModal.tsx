import React from 'react';
import { Bell, Clock, X, Heart } from 'lucide-react';

interface ReminderModalProps {
  onClose: () => void;
  onComenzar: () => void;
}

export const ReminderModal: React.FC<ReminderModalProps> = ({ onClose, onComenzar }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-gradient-to-b from-purple-950 via-purple-900 to-indigo-950 border border-pink-500/50 rounded-3xl p-6 max-w-sm w-full text-white shadow-2xl space-y-6 text-center relative overflow-hidden">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-purple-900/60 text-purple-300 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Alarm Clock Icon with glow */}
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center mx-auto text-white shadow-xl shadow-pink-500/40 animate-pulse">
          <Clock className="w-10 h-10" />
        </div>

        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-pink-300 bg-pink-500/20 px-3 py-1 rounded-full border border-pink-500/40">
            Recordatorio Inteligente
          </span>
          <h2 className="text-xl font-extrabold text-white mt-3">¡MARIEL, YA ES HORA DE ALISTARTE!</h2>
          <p className="text-xs text-purple-200 mt-2">
            Te quedan <strong className="text-pink-300 font-bold">30 minutos</strong> para asistir al <strong className="text-white">GYM</strong>. Prepara tu ropa, tu botella de agua y tus zapatillas 👟
          </p>
        </div>

        {/* Countdown Timer Widget */}
        <div className="p-4 rounded-2xl bg-purple-900/60 border border-purple-700/60 shadow-inner">
          <p className="text-[10px] text-purple-300 uppercase mb-1 font-bold">Hoy trabajamos:</p>
          <p className="text-sm font-extrabold text-pink-300 mb-3">TREN SUPERIOR</p>
          <div className="text-3xl font-mono font-black text-white tracking-widest">
            00:30:00
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={onComenzar}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm shadow-xl shadow-pink-500/30 hover:scale-105 transition-all flex items-center justify-center gap-2"
          >
            <span>¡Vamos, tú puedes!</span> <Heart className="w-4 h-4 text-white fill-white" />
          </button>
          
          <button
            onClick={onClose}
            className="w-full py-3 rounded-2xl bg-purple-900/40 border border-purple-700/60 text-purple-300 hover:text-white font-bold text-xs transition-all"
          >
            Recordarme en 5 min ⏰
          </button>
        </div>

      </div>
    </div>
  );
};
