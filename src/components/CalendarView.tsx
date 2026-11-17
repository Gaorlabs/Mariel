import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { EventItem } from '../types/agenda';

interface CalendarViewProps {
  events: EventItem[];
  onOpenNewEvent: () => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({ events, onOpenNewEvent }) => {
  const [view, setView] = useState<'dia' | 'semana' | 'mes'>('mes');
  const [currentDate, setCurrentDate] = useState('2026-10-15');

  // Generate days of October 2026 for month view
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-purple-950/40 p-6 rounded-3xl border border-purple-800/40 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Calendario Inteligente</h1>
            <p className="text-xs text-purple-300">Octubre 2026 • Vista de {view}</p>
          </div>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-purple-900/50 p-1 rounded-2xl border border-purple-700/40">
            {(['dia', 'semana', 'mes'] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                  view === v
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                    : 'text-purple-300 hover:text-white'
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenNewEvent}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Evento</span>
          </button>
        </div>
      </div>

      {/* Month Grid View */}
      {view === 'mes' && (
        <div className="bg-purple-950/60 backdrop-blur-md rounded-3xl border border-purple-800/50 p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Octubre 2026</h2>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-xl bg-purple-900 text-purple-200 hover:text-white">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-xl bg-purple-900 text-purple-200 hover:text-white">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2 text-center">
            {weekDays.map(d => (
              <span key={d} className="text-xs font-bold text-pink-300 py-1">{d}</span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {/* Empty slots for start of month offset */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={`empty-${i}`} className="h-24 rounded-2xl bg-purple-900/10 border border-purple-800/20 opacity-30" />
            ))}

            {daysInMonth.map(day => {
              const dateStr = `2026-10-${day < 10 ? '0' + day : day}`;
              const dayEvts = events.filter(e => e.fecha === dateStr);
              const isToday = day === 15;

              return (
                <div
                  key={day}
                  onClick={() => setCurrentDate(dateStr)}
                  className={`h-24 rounded-2xl p-2 border transition-all flex flex-col justify-between cursor-pointer ${
                    isToday
                      ? 'bg-gradient-to-br from-purple-900/80 to-pink-950/80 border-pink-500 shadow-lg shadow-pink-500/20 ring-2 ring-pink-500/50'
                      : 'bg-purple-900/30 border-purple-800/50 hover:border-purple-600'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${isToday ? 'text-white bg-pink-500 w-6 h-6 rounded-full flex items-center justify-center' : 'text-purple-200'}`}>
                      {day}
                    </span>
                    {dayEvts.length > 0 && (
                      <span className="text-[10px] bg-purple-800 text-pink-200 px-1.5 py-0.5 rounded-full font-bold">
                        {dayEvts.length}
                      </span>
                    )}
                  </div>

                  <div className="space-y-1 overflow-hidden">
                    {dayEvts.slice(0, 2).map((ev, idx) => (
                      <div
                        key={idx}
                        className="text-[9px] truncate px-1.5 py-0.5 rounded text-white font-medium shadow-sm"
                        style={{ backgroundColor: ev.color }}
                      >
                        {ev.titulo}
                      </div>
                    ))}
                    {dayEvts.length > 2 && (
                      <span className="text-[9px] text-pink-300 font-bold block text-right">
                        +{dayEvts.length - 2} más
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Week View */}
      {view === 'semana' && (
        <div className="bg-purple-950/60 backdrop-blur-md rounded-3xl border border-purple-800/50 p-6 shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-white mb-2">Semana del 12 al 18 de Octubre de 2026</h2>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            {weekDays.map((wd, i) => {
              const dayNum = 12 + i;
              const dateStr = `2026-10-${dayNum}`;
              const dayEvts = events.filter(e => e.fecha === dateStr);
              return (
                <div key={wd} className="bg-purple-900/30 border border-purple-800/60 rounded-2xl p-4 space-y-3">
                  <div className="text-center pb-2 border-b border-purple-800">
                    <p className="text-xs text-pink-300 font-bold">{wd}</p>
                    <p className="text-sm font-extrabold text-white">Oct {dayNum}</p>
                  </div>
                  <div className="space-y-2">
                    {dayEvts.length === 0 ? (
                      <p className="text-[11px] text-purple-400 text-center py-4">Sin eventos</p>
                    ) : (
                      dayEvts.map(ev => (
                        <div key={ev.id} className="p-2 rounded-xl text-xs text-white font-medium" style={{ backgroundColor: ev.color }}>
                          <p className="font-bold truncate">{ev.titulo}</p>
                          <p className="text-[10px] text-white/90">{ev.inicio} - {ev.fin}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Day View */}
      {view === 'dia' && (
        <div className="bg-purple-950/60 backdrop-blur-md rounded-3xl border border-purple-800/50 p-6 shadow-xl space-y-4">
          <h2 className="text-lg font-bold text-white mb-4">Eventos para {currentDate}</h2>
          <div className="space-y-3">
            {events.filter(e => e.fecha === currentDate).length === 0 ? (
              <p className="text-sm text-purple-300 text-center py-8">No hay eventos programados para este día.</p>
            ) : (
              events.filter(e => e.fecha === currentDate).map(ev => (
                <div key={ev.id} className="p-4 rounded-2xl bg-purple-900/40 border border-purple-700/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-12 rounded-full" style={{ backgroundColor: ev.color }} />
                    <div>
                      <h3 className="font-bold text-white text-base">{ev.titulo}</h3>
                      <p className="text-xs text-pink-300">{ev.inicio} - {ev.fin} • {ev.categoria}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full font-bold ${ev.completado ? 'bg-green-500/20 text-green-300' : 'bg-purple-800 text-purple-200'}`}>
                    {ev.completado ? 'Completado' : 'Pendiente'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
