import React, { useState } from 'react';
import { X, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { EventItem, CategoryType } from '../types/agenda';

interface EventModalProps {
  onClose: () => void;
  onSave: (event: EventItem) => void;
}

export const EventModal: React.FC<EventModalProps> = ({ onClose, onSave }) => {
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState<CategoryType>('gym');
  const [color, setColor] = useState('#ec4899');
  const [inicio, setInicio] = useState('08:00');
  const [fin, setFin] = useState('09:00');
  const [fecha, setFecha] = useState('2026-10-15');
  const [repeticion, setRepeticion] = useState<'diaria' | 'semanal' | 'ninguna'>('ninguna');
  const [recordatorio, setRecordatorio] = useState(15);
  const [descripcion, setDescripcion] = useState('');

  const categoryColors: Record<CategoryType, string> = {
    gym: '#ec4899',
    trabajo: '#3b82f6',
    contenido: '#a855f7',
    compras: '#22c55e',
    negocio: '#f97316',
    personal: '#8b5cf6',
    salud: '#ec4899',
    nutricion: '#f97316'
  };

  const handleCategoryChange = (cat: CategoryType) => {
    setCategoria(cat);
    setColor(categoryColors[cat] || '#ec4899');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim()) return;

    const newEvt: EventItem = {
      id: 'evt_' + Date.now(),
      user_id: 'user_mariel',
      titulo: titulo.trim(),
      categoria,
      color,
      inicio,
      fin,
      fecha,
      completado: false,
      repeticion,
      recordatorio_min: Number(recordatorio),
      descripcion
    };

    onSave(newEvt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-gradient-to-b from-purple-950 to-indigo-950 border border-purple-500/40 rounded-3xl p-6 max-w-lg w-full text-white shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-pink-400" />
            <span>Crear Nuevo Evento</span>
          </h3>
          <button onClick={onClose} className="p-2 rounded-xl bg-purple-900 text-purple-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="text-purple-300 block mb-1">Título del Evento</label>
            <input
              type="text"
              value={titulo}
              onChange={e => setTitulo(e.target.value)}
              placeholder="Ej. Reunión de Negocios o Gimnasio"
              className="w-full bg-purple-900/50 border border-purple-700/60 rounded-xl p-3 text-white placeholder-purple-400"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-purple-300 block mb-1">Categoría</label>
              <select
                value={categoria}
                onChange={e => handleCategoryChange(e.target.value as CategoryType)}
                className="w-full bg-purple-900 border border-purple-700 rounded-xl p-3 text-white capitalize"
              >
                <option value="gym">Gym 🏋️‍♀️</option>
                <option value="trabajo">Trabajo 💻</option>
                <option value="contenido">Contenido 📱</option>
                <option value="compras">Compras 🛒</option>
                <option value="negocio">Negocio 🍳</option>
                <option value="personal">Personal 🧘‍♀️</option>
                <option value="nutricion">Nutrición 🥗</option>
              </select>
            </div>

            <div>
              <label className="text-purple-300 block mb-1">Color</label>
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="color"
                  value={color}
                  onChange={e => setColor(e.target.value)}
                  className="w-10 h-10 rounded-xl bg-transparent border border-purple-700 cursor-pointer"
                />
                <span className="text-purple-200 font-mono">{color}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-purple-300 block mb-1">Fecha</label>
              <input
                type="date"
                value={fecha}
                onChange={e => setFecha(e.target.value)}
                className="w-full bg-purple-900 border border-purple-700 rounded-xl p-3 text-white"
              />
            </div>
            <div>
              <label className="text-purple-300 block mb-1">Hora Inicio</label>
              <input
                type="text"
                value={inicio}
                onChange={e => setInicio(e.target.value)}
                placeholder="07:00"
                className="w-full bg-purple-900 border border-purple-700 rounded-xl p-3 text-white"
              />
            </div>
            <div>
              <label className="text-purple-300 block mb-1">Hora Fin</label>
              <input
                type="text"
                value={fin}
                onChange={e => setFin(e.target.value)}
                placeholder="08:00"
                className="w-full bg-purple-900 border border-purple-700 rounded-xl p-3 text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-purple-300 block mb-1">Repetición</label>
              <select
                value={repeticion}
                onChange={e => setRepeticion(e.target.value as any)}
                className="w-full bg-purple-900 border border-purple-700 rounded-xl p-3 text-white capitalize"
              >
                <option value="ninguna">Ninguna</option>
                <option value="diaria">Diaria</option>
                <option value="semanal">Semanal</option>
              </select>
            </div>

            <div>
              <label className="text-purple-300 block mb-1">Recordatorio (minutos antes)</label>
              <input
                type="number"
                value={recordatorio}
                onChange={e => setRecordatorio(Number(e.target.value))}
                className="w-full bg-purple-900 border border-purple-700 rounded-xl p-3 text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-purple-300 block mb-1">Descripción / Notas</label>
            <textarea
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              placeholder="Notas adicionales..."
              rows={2}
              className="w-full bg-purple-900/50 border border-purple-700/60 rounded-xl p-3 text-white placeholder-purple-400"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-purple-900 text-purple-300 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold shadow-lg"
            >
              Guardar Evento
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
