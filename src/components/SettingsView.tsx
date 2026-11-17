import React, { useState } from 'react';
import { Settings as SettingsIcon, Database, Bell, Smartphone, Check, Copy } from 'lucide-react';
import { UserSettings } from '../types/agenda';
import { SUPABASE_SQL_SCHEMA } from '../services/db';

interface SettingsViewProps {
  settings: UserSettings;
  onSaveSettings: (settings: UserSettings) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ settings, onSaveSettings }) => {
  const [form, setForm] = useState<UserSettings>(settings);
  const [copied, setCopied] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-purple-950/40 p-6 rounded-3xl border border-purple-800/40 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
            <SettingsIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Configuración & Supabase</h1>
            <p className="text-xs text-purple-300">Ajusta tus preferencias, notificaciones y conexión con Base de Datos</p>
          </div>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-green-500/20 border border-green-500/40 text-green-200 text-xs font-bold flex items-center gap-2">
          <Check className="w-5 h-5 text-green-400" /> ¡Configuración guardada correctamente!
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-purple-950/60 backdrop-blur-md p-6 rounded-3xl border border-purple-800/50 shadow-xl space-y-6">
        <h2 className="font-bold text-white text-base flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-pink-400" />
          <span>Datos Personales y Notificaciones</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-purple-300 block mb-1">Nombre</label>
            <input 
              type="text" 
              value={form.nombre} 
              onChange={e => setForm({...form, nombre: e.target.value})}
              className="w-full bg-purple-900/50 border border-purple-700/60 rounded-xl p-3 text-white" 
            />
          </div>
          <div>
            <label className="text-purple-300 block mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              value={form.email} 
              onChange={e => setForm({...form, email: e.target.value})}
              className="w-full bg-purple-900/50 border border-purple-700/60 rounded-xl p-3 text-white" 
            />
          </div>
          <div>
            <label className="text-purple-300 block mb-1">Número de WhatsApp (para alertas)</label>
            <input 
              type="text" 
              value={form.whatsapp} 
              onChange={e => setForm({...form, whatsapp: e.target.value})}
              className="w-full bg-purple-900/50 border border-purple-700/60 rounded-xl p-3 text-white" 
            />
          </div>
        </div>

        <h2 className="font-bold text-white text-base flex items-center gap-2 pt-4 border-t border-purple-800">
          <Database className="w-5 h-5 text-pink-400" />
          <span>Conexión Supabase (URL & Anon Key)</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="text-purple-300 block mb-1">Supabase URL</label>
            <input 
              type="text" 
              value={form.supabase_url} 
              onChange={e => setForm({...form, supabase_url: e.target.value})}
              placeholder="https://tu-proyecto.supabase.co"
              className="w-full bg-purple-900/50 border border-purple-700/60 rounded-xl p-3 text-white" 
            />
          </div>
          <div>
            <label className="text-purple-300 block mb-1">Supabase Anon Key</label>
            <input 
              type="password" 
              value={form.supabase_anon_key} 
              onChange={e => setForm({...form, supabase_anon_key: e.target.value})}
              placeholder="eyJhbGciOiJIUzI1NiIsIn..."
              className="w-full bg-purple-900/50 border border-purple-700/60 rounded-xl p-3 text-white" 
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs shadow-lg"
          >
            Guardar Cambios
          </button>
        </div>
      </form>

      {/* SQL Script Viewer */}
      <div className="bg-purple-950/60 backdrop-blur-md p-6 rounded-3xl border border-purple-800/50 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-white text-base flex items-center gap-2">
            <Database className="w-5 h-5 text-pink-400" />
            <span>Script SQL Completo para Supabase</span>
          </h2>
          <button
            onClick={handleCopySql}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-900 hover:bg-purple-800 text-pink-300 text-xs font-bold transition-all border border-purple-700"
          >
            {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '¡Copiado!' : 'Copiar SQL'}</span>
          </button>
        </div>
        <p className="text-xs text-purple-300">
          Copia este código y ejecútalo en el SQL Editor de tu proyecto en Supabase para crear todas las tablas, relaciones y políticas RLS automáticamente.
        </p>
        <pre className="p-4 rounded-2xl bg-purple-950 border border-purple-900 text-purple-200 text-[10px] overflow-x-auto max-h-60">
          {SUPABASE_SQL_SCHEMA}
        </pre>
      </div>
    </div>
  );
};
