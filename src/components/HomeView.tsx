import React, { useState } from 'react';
import { 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Zap, 
  Dumbbell, 
  Briefcase, 
  Video, 
  ShoppingBag, 
  Utensils, 
  Heart, 
  Bell
} from 'lucide-react';
import { EventItem, TaskItem, UserSettings } from '../types/agenda';

interface HomeViewProps {
  events: EventItem[];
  tasks: TaskItem[];
  onToggleEvent: (id: string) => void;
  onOpenNewEvent: () => void;
  onAutoSchedule: () => void;
  settings: UserSettings;
  notificationsCount: number;
  onOpenNotifications: () => void;
}

const categoryIcons: Record<string, any> = {
  gym: Dumbbell,
  trabajo: Briefcase,
  contenido: Video,
  compras: ShoppingBag,
  negocio: Utensils,
  personal: Heart,
  salud: Heart,
  nutricion: Utensils,
};

export const HomeView: React.FC<HomeViewProps> = ({
  events,
  tasks,
  onToggleEvent,
  onOpenNewEvent,
  onAutoSchedule,
  settings,
  notificationsCount,
  onOpenNotifications
}) => {
  const [selectedDate, setSelectedDate] = useState('2026-10-15');
  const [viewMode, setViewMode] = useState<'Día' | 'Semana' | 'Mes'>('Día');
  const [autoScheduleActive, setAutoScheduleActive] = useState(true);
  const [showAutoModal, setShowAutoModal] = useState(false);
  const [autoScheduleMessage, setAutoScheduleMessage] = useState<string | null>(null);

  // Filter events for selected date
  const dayEvents = events.filter(e => e.fecha === selectedDate).sort((a, b) => a.inicio.localeCompare(b.inicio));
  
  const completedTasksCount = tasks.filter(t => t.completada).length;
  const totalTasksCount = tasks.length || 1;
  const goalPercentage = Math.round((completedTasksCount / totalTasksCount) * 100);

  const handleRunAutoSchedule = () => {
    setShowAutoModal(true);
    setAutoScheduleMessage('Analizando huecos libres y reprogramando pendientes...');
    setTimeout(() => {
      setAutoScheduleMessage('¡Éxito! Se han asignado 2 tareas pendientes en los bloques de las 16:00 y 20:00.');
      onAutoSchedule();
    }, 1500);
  };

  // Hours array for timeline
  const hours = [
    '7:00 am', '8:00 am', '9:00 am', '10:00 am', '11:00 am', 
    '12:00 pm', '1:00 pm', '2:00 pm', '3:00 pm', '4:00 pm', 
    '5:00 pm', '6:00 pm', '7:00 pm', '8:00 pm', '9:00 pm'
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-purple-900/40 via-purple-800/20 to-pink-900/30 p-6 rounded-3xl border border-purple-500/20 shadow-xl">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-2">
            ¡Hola, {settings.nombre}! <span className="text-2xl">💜</span>
          </h1>
          <p className="text-sm text-purple-200 mt-1">
            Organiza tu día y deja que la app se encargue del resto ✨
          </p>
        </div>

        {/* Desktop Notification & User Profile Badge */}
        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={onOpenNotifications}
            className="relative p-3 rounded-2xl bg-purple-900/60 border border-purple-700/50 text-pink-200 hover:bg-purple-800 transition-all shadow-md"
          >
            <Bell className="w-5 h-5" />
            {notificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                {notificationsCount}
              </span>
            )}
          </button>

          <div className="flex items-center gap-3 bg-purple-950/80 border border-purple-800/60 px-4 py-2 rounded-2xl shadow-inner">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-md">
              {settings.nombre.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-bold text-white">{settings.nombre}</p>
              <p className="text-[11px] text-pink-300">Plan Premium IA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Date Navigation & Actions Toolbar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-purple-950/40 p-4 rounded-2xl border border-purple-800/40">
        {/* Date Selector */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setSelectedDate('2026-10-14')}
            className="p-2 rounded-xl bg-purple-900/60 text-pink-200 hover:bg-purple-800 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-900/40 border border-purple-700/50 text-white font-medium text-sm shadow-sm">
            <CalendarIcon className="w-4 h-4 text-pink-400" />
            <span>Miércoles, 15 de Octubre de 2026</span>
          </div>

          <button 
            onClick={() => setSelectedDate('2026-10-16')}
            className="p-2 rounded-xl bg-purple-900/60 text-pink-200 hover:bg-purple-800 transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* View mode switcher */}
        <div className="flex items-center bg-purple-900/50 p-1 rounded-2xl border border-purple-700/40">
          {(['Día', 'Semana', 'Mes'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                viewMode === mode
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md'
                  : 'text-purple-300 hover:text-white'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Programar Automáticamente Button (Matching Figma) */}
        <button
          onClick={handleRunAutoSchedule}
          className="relative group flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 text-white font-bold text-sm shadow-xl shadow-purple-600/30 hover:scale-105 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Sparkles className="w-5 h-5 animate-pulse text-yellow-200" />
          <span>Programar Automáticamente</span>
        </button>
      </div>

      {/* Main Grid Layout: Timeline + Right Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left / Center: Hourly Timeline */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-purple-950/60 backdrop-blur-md rounded-3xl border border-purple-800/50 p-6 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-pink-400" />
              <span>Miércoles 15 de Octubre — Agenda del Día</span>
            </h2>

            {/* Timeline Blocks */}
            <div className="space-y-3">
              {dayEvents.map((evt) => {
                const IconComponent = categoryIcons[evt.categoria] || Clock;
                return (
                  <div
                    key={evt.id}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 shadow-lg ${
                      evt.completado
                        ? 'bg-purple-900/20 border-purple-700/30 opacity-80'
                        : 'bg-purple-900/50 border-purple-600/40 hover:border-pink-500/50'
                    }`}
                    style={{ borderLeftColor: evt.color, borderLeftWidth: '6px' }}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-md text-white"
                        style={{ backgroundColor: evt.color }}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className={`font-bold text-white text-base ${evt.completado ? 'line-through text-purple-300' : ''}`}>
                          {evt.titulo}
                        </h3>
                        <p className="text-xs text-pink-300 font-medium mt-0.5">
                          {evt.inicio} – {evt.fin} {evt.recordatorio_min ? `• ⏰ ${evt.recordatorio_min} min antes` : ''}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleEvent(evt.id)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                        evt.completado
                          ? 'bg-green-500 text-white shadow-md shadow-green-500/30'
                          : 'bg-purple-800/80 border border-purple-600 text-purple-300 hover:text-white hover:bg-purple-700'
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5" />
                    </button>
                  </div>
                );
              })}

              {/* Add Event Button */}
              <button
                onClick={onOpenNewEvent}
                className="w-full py-4 rounded-2xl border-2 border-dashed border-purple-700/60 hover:border-pink-500/80 bg-purple-900/20 hover:bg-purple-900/40 text-purple-200 hover:text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-inner"
              >
                <Plus className="w-5 h-5 text-pink-400" />
                <span>Agregar Evento</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar Widgets */}
        <div className="space-y-6">
          
          {/* Automatización Inteligente Widget */}
          <div className="bg-gradient-to-br from-purple-900/60 via-purple-950/80 to-indigo-950/90 rounded-3xl p-6 border border-purple-500/30 shadow-xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <h3 className="font-bold text-white text-sm">Automatización Inteligente</h3>
              </div>
              <button
                onClick={() => setAutoScheduleActive(!autoScheduleActive)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
                  autoScheduleActive ? 'bg-pink-500' : 'bg-purple-900'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  autoScheduleActive ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <p className="text-xs text-purple-200 mb-4 leading-relaxed">
              Deja que tu agenda se organice sola y optimice tus hábitos diarios.
            </p>

            <div className="space-y-2.5 text-xs text-purple-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                <span>Detecta tus hábitos y preferencias</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                <span>Sugiere horarios ideales</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                <span>Reprograma si cambian tus planes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                <span>Te envía recordatorios push</span>
              </div>
            </div>
          </div>

          {/* Resumen del Día Widget */}
          <div className="bg-purple-950/60 backdrop-blur-md rounded-3xl p-6 border border-purple-800/50 shadow-xl">
            <h3 className="font-bold text-white text-sm mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span>Resumen del Día</span>
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between text-purple-200">
                <span className="flex items-center gap-2 text-xs">
                  <CheckCircle2 className="w-4 h-4 text-green-400" /> Tareas completadas
                </span>
                <span className="font-bold text-white">{completedTasksCount} / {totalTasksCount}</span>
              </div>

              <div className="flex items-center justify-between text-purple-200">
                <span className="flex items-center gap-2 text-xs">
                  <Clock className="w-4 h-4 text-yellow-400" /> Tiempo productivo
                </span>
                <span className="font-bold text-white">6 h 30 min</span>
              </div>

              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between text-xs text-purple-200">
                  <span>Meta del día</span>
                  <span className="font-bold text-pink-300">{goalPercentage}%</span>
                </div>
                <div className="w-full bg-purple-900/60 h-2.5 rounded-full overflow-hidden p-0.5 border border-purple-700/50">
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full transition-all duration-500 shadow-md"
                    style={{ width: `${goalPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Próximos Eventos Widget */}
          <div className="bg-purple-950/60 backdrop-blur-md rounded-3xl p-6 border border-purple-800/50 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-pink-400" />
                <span>Próximos Eventos</span>
              </h3>
              <span className="text-xs text-pink-300 font-medium cursor-pointer hover:underline">Ver todos &gt;</span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-2xl bg-purple-900/40 border border-purple-700/40 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-xs">Gym - Entrenamiento</h4>
                  <p className="text-[11px] text-purple-300">Mañana • 7:00 am</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-pink-500 shadow-md" />
              </div>

              <div className="p-3 rounded-2xl bg-purple-900/40 border border-purple-700/40 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-xs">Reunión de Negocios</h4>
                  <p className="text-[11px] text-purple-300">Mañana • 10:00 am</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-blue-500 shadow-md" />
              </div>

              <div className="p-3 rounded-2xl bg-purple-900/40 border border-purple-700/40 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-xs">Cumpleaños de mi hija</h4>
                  <p className="text-[11px] text-purple-300">Mañana • 7:00 pm</p>
                </div>
                <div className="w-3 h-3 rounded-full bg-purple-500 shadow-md" />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Auto Schedule Modal */}
      {showAutoModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gradient-to-b from-purple-900 to-indigo-950 border border-purple-500/40 rounded-3xl p-6 max-w-md w-full text-white shadow-2xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center mx-auto text-pink-300">
              <Sparkles className="w-6 h-6 animate-spin" />
            </div>
            <h3 className="text-xl font-bold text-center">Programador IA Inteligente</h3>
            <p className="text-sm text-purple-200 text-center">{autoScheduleMessage}</p>
            {autoScheduleMessage?.includes('¡Éxito!') && (
              <button
                onClick={() => setShowAutoModal(false)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow-lg"
              >
                ¡Entendido, aceptar horario!
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
