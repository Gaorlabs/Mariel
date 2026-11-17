import React, { useState } from 'react';
import { HeartPulse, Scale, Flame, Droplet, Moon, Plus, AlertCircle, Award } from 'lucide-react';
import { HealthProfile, BodyMeasurement } from '../types/agenda';

interface HealthViewProps {
  health: HealthProfile;
  measurements: BodyMeasurement[];
  onUpdateHealth: (profile: HealthProfile) => void;
  onAddMeasurement: (m: BodyMeasurement) => void;
  waterMl: number;
  onUpdateWater: (ml: number) => void;
}

export const HealthView: React.FC<HealthViewProps> = ({
  health,
  measurements,
  onUpdateHealth,
  onAddMeasurement,
  waterMl,
  onUpdateWater
}) => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [form, setForm] = useState<HealthProfile>(health);
  const [showMeasureModal, setShowMeasureModal] = useState(false);
  
  // New measurement form
  const [newWeight, setNewWeight] = useState(health.peso_actual);
  const [cintura, setCintura] = useState(73);
  const [cadera, setCadera] = useState(97);
  const [brazo, setBrazo] = useState(28.5);
  const [pecho, setPecho] = useState(91);

  // BMI Calculation
  const heightM = health.estatura / 100;
  const bmi = Number((health.peso_actual / (heightM * heightM)).toFixed(1));
  let bmiCategory = 'Normal';
  let bmiColor = 'text-green-400 bg-green-500/20 border-green-500/40';
  if (bmi < 18.5) {
    bmiCategory = 'Bajo peso';
    bmiColor = 'text-yellow-400 bg-yellow-500/20 border-yellow-500/40';
  } else if (bmi >= 25 && bmi < 30) {
    bmiCategory = 'Sobrepeso';
    bmiColor = 'text-orange-400 bg-orange-500/20 border-orange-500/40';
  } else if (bmi >= 30) {
    bmiCategory = 'Obesidad';
    bmiColor = 'text-red-400 bg-red-500/20 border-red-500/40';
  }

  const handleSaveOnboarding = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateHealth(form);
    setShowOnboarding(false);
  };

  const handleSaveMeasurement = (e: React.FormEvent) => {
    e.preventDefault();
    const newM: BodyMeasurement = {
      id: 'ms_' + Date.now(),
      fecha: new Date().toISOString().split('T')[0],
      peso: Number(newWeight),
      cintura: Number(cintura),
      cadera: Number(cadera),
      brazo: Number(brazo),
      pecho: Number(pecho)
    };
    onAddMeasurement(newM);
    setShowMeasureModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-pink-900/40 via-purple-900/30 to-purple-950/60 p-6 rounded-3xl border border-pink-500/25 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-pink-500/30">
            <HeartPulse className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white">Mi Salud y Bienestar</h1>
            <p className="text-xs text-pink-200">Monitorea tu peso, medidas, metabolismo y metas</p>
          </div>
        </div>

        <button
          onClick={() => setShowOnboarding(true)}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all"
        >
          Editar Onboarding / Metas
        </button>
      </div>

      {/* Safety Notice Banner */}
      <div className="bg-purple-900/40 border border-purple-700/60 p-4 rounded-2xl flex items-start gap-3 text-purple-200 text-xs">
        <AlertCircle className="w-5 h-5 text-pink-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-white mb-0.5">Aviso de Salud e IMC</p>
          <p>Son estimaciones basadas en Mifflin-St Jeor; consulta con un profesional de salud para un plan clínico personalizado. Ritmo seguro recomendado: 0.5 a 1 kg por semana.</p>
        </div>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* BMI Card */}
        <div className="bg-purple-950/60 backdrop-blur-md p-6 rounded-3xl border border-purple-800/50 shadow-xl flex flex-col justify-between">
          <div>
            <p className="text-xs text-purple-300 font-bold uppercase tracking-wider">Índice de Masa Corporal</p>
            <h3 className="text-3xl font-extrabold text-white mt-2">{bmi}</h3>
          </div>
          <div className={`mt-4 px-3 py-1 rounded-xl text-xs font-bold border text-center ${bmiColor}`}>
            {bmiCategory}
          </div>
        </div>

        {/* BMR Card */}
        <div className="bg-purple-950/60 backdrop-blur-md p-6 rounded-3xl border border-purple-800/50 shadow-xl flex flex-col justify-between">
          <div>
            <p className="text-xs text-purple-300 font-bold uppercase tracking-wider">Metabolismo Basal (BMR)</p>
            <h3 className="text-3xl font-extrabold text-white mt-2">{health.bmr || 1380} <span className="text-sm font-normal text-purple-300">kcal</span></h3>
          </div>
          <p className="text-[11px] text-pink-300 mt-4">Calorías en reposo absoluto</p>
        </div>

        {/* TDEE Card */}
        <div className="bg-purple-950/60 backdrop-blur-md p-6 rounded-3xl border border-purple-800/50 shadow-xl flex flex-col justify-between">
          <div>
            <p className="text-xs text-purple-300 font-bold uppercase tracking-wider">Gasto Diario Total (TDEE)</p>
            <h3 className="text-3xl font-extrabold text-white mt-2">{health.tdee || 2139} <span className="text-sm font-normal text-purple-300">kcal</span></h3>
          </div>
          <p className="text-[11px] text-pink-300 mt-4">Con nivel de actividad {health.nivel_actividad}</p>
        </div>

        {/* Target Calories */}
        <div className="bg-purple-950/60 backdrop-blur-md p-6 rounded-3xl border border-purple-800/50 shadow-xl flex flex-col justify-between">
          <div>
            <p className="text-xs text-purple-300 font-bold uppercase tracking-wider">Meta Diaria de Calorías</p>
            <h3 className="text-3xl font-extrabold text-pink-300 mt-2">{health.calorias_meta || 1739} <span className="text-sm font-normal text-purple-300">kcal</span></h3>
          </div>
          <p className="text-[11px] text-pink-300 mt-4 capitalize">Objetivo: {health.objetivo} de peso</p>
        </div>
      </div>

      {/* Weight Progress & Measurements Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Weight Progress Card */}
        <div className="bg-purple-950/60 backdrop-blur-md p-6 rounded-3xl border border-purple-800/50 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Scale className="w-5 h-5 text-pink-400" />
              <span>Progreso de Peso</span>
            </h3>
            <button
              onClick={() => setShowMeasureModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-900 hover:bg-purple-800 text-pink-300 text-xs font-bold transition-all border border-purple-700"
            >
              <Plus className="w-4 h-4" />
              <span>Registrar Medida</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center p-4 rounded-2xl bg-purple-900/30 border border-purple-800">
            <div>
              <p className="text-xs text-purple-300">Peso Inicial</p>
              <p className="text-lg font-bold text-white mt-1">63.5 kg</p>
            </div>
            <div>
              <p className="text-xs text-pink-300 font-bold">Peso Actual</p>
              <p className="text-xl font-extrabold text-pink-300 mt-1">{health.peso_actual} kg</p>
            </div>
            <div>
              <p className="text-xs text-purple-300">Peso Meta</p>
              <p className="text-lg font-bold text-white mt-1">{health.peso_meta} kg</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-purple-200">
              <span>Avance hacia la meta</span>
              <span className="font-bold text-pink-300">75% completado</span>
            </div>
            <div className="w-full bg-purple-900/60 h-3 rounded-full overflow-hidden p-0.5 border border-purple-700/50">
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full" style={{ width: '75%' }} />
            </div>
          </div>

          {/* Measurements History Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">Historial de Medidas Corporales</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {measurements.map(m => (
                <div key={m.id} className="p-3 rounded-xl bg-purple-900/40 border border-purple-800/60 flex items-center justify-between text-xs text-purple-200">
                  <span className="font-bold text-white">{m.fecha}</span>
                  <span>Peso: <strong className="text-pink-300">{m.peso} kg</strong></span>
                  <span>Cintura: {m.cintura} cm</span>
                  <span>Cadera: {m.cadera} cm</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Water & Sleep Daily Tracking */}
        <div className="space-y-6">
          {/* Water Tracker Card */}
          <div className="bg-purple-950/60 backdrop-blur-md p-6 rounded-3xl border border-purple-800/50 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Droplet className="w-5 h-5 text-blue-400" />
                <span>Hidratación del Día</span>
              </h3>
              <span className="text-xs font-bold text-blue-300">{waterMl} / {health.agua_meta_ml || 2500} ml</span>
            </div>

            <div className="w-full bg-purple-900/60 h-3 rounded-full overflow-hidden p-0.5 border border-purple-700/50">
              <div 
                className="bg-gradient-to-r from-blue-400 to-indigo-500 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (waterMl / (health.agua_meta_ml || 2500)) * 100)}%` }}
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => onUpdateWater(waterMl + 250)}
                className="flex-1 py-3 rounded-2xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-200 font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4" /> +1 Vaso (250 ml)
              </button>
              <button
                onClick={() => onUpdateWater(waterMl + 500)}
                className="flex-1 py-3 rounded-2xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/40 text-blue-200 font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                <Plus className="w-4 h-4" /> +500 ml Botella
              </button>
            </div>
          </div>

          {/* Sleep & Rest Card */}
          <div className="bg-purple-950/60 backdrop-blur-md p-6 rounded-3xl border border-purple-800/50 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Moon className="w-5 h-5 text-indigo-400" />
                <span>Sueño y Descanso</span>
              </h3>
              <span className="text-xs font-bold text-indigo-300">Promedio: 8 h / noche</span>
            </div>

            <p className="text-xs text-purple-200 leading-relaxed">
              Tu calidad de sueño esta semana ha sido excelente. Un buen descanso acelera la recuperación muscular y el metabolismo.
            </p>

            <div className="p-3 rounded-2xl bg-indigo-950/40 border border-indigo-800/40 flex items-center gap-3">
              <Award className="w-6 h-6 text-yellow-400 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-white">Racha de sueño óptimo</p>
                <p className="text-purple-300">7 días durmiendo más de 7.5 horas.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Onboarding Modal */}
      {showOnboarding && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gradient-to-b from-purple-950 to-indigo-950 border border-purple-500/40 rounded-3xl p-6 max-w-lg w-full text-white shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold">Onboarding & Metas de Salud</h3>
            <form onSubmit={handleSaveOnboarding} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-purple-300 block mb-1">Sexo</label>
                  <select 
                    value={form.sexo} 
                    onChange={e => setForm({...form, sexo: e.target.value as any})}
                    className="w-full bg-purple-900 border border-purple-700 rounded-xl p-2.5 text-white"
                  >
                    <option value="mujer">Mujer</option>
                    <option value="hombre">Hombre</option>
                  </select>
                </div>
                <div>
                  <label className="text-purple-300 block mb-1">Edad</label>
                  <input 
                    type="number" 
                    value={form.edad} 
                    onChange={e => setForm({...form, edad: Number(e.target.value)})}
                    className="w-full bg-purple-900 border border-purple-700 rounded-xl p-2.5 text-white" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-purple-300 block mb-1">Estatura (cm)</label>
                  <input 
                    type="number" 
                    value={form.estatura} 
                    onChange={e => setForm({...form, estatura: Number(e.target.value)})}
                    className="w-full bg-purple-900 border border-purple-700 rounded-xl p-2.5 text-white" 
                  />
                </div>
                <div>
                  <label className="text-purple-300 block mb-1">Peso Actual (kg)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={form.peso_actual} 
                    onChange={e => setForm({...form, peso_actual: Number(e.target.value)})}
                    className="w-full bg-purple-900 border border-purple-700 rounded-xl p-2.5 text-white" 
                  />
                </div>
                <div>
                  <label className="text-purple-300 block mb-1">Peso Meta (kg)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={form.peso_meta} 
                    onChange={e => setForm({...form, peso_meta: Number(e.target.value)})}
                    className="w-full bg-purple-900 border border-purple-700 rounded-xl p-2.5 text-white" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-purple-300 block mb-1">Nivel de Actividad</label>
                  <select 
                    value={form.nivel_actividad} 
                    onChange={e => setForm({...form, nivel_actividad: e.target.value as any})}
                    className="w-full bg-purple-900 border border-purple-700 rounded-xl p-2.5 text-white capitalize"
                  >
                    <option value="sedentario">Sedentario</option>
                    <option value="ligero">Ligero (1-3 días/sem)</option>
                    <option value="moderado">Moderado (3-5 días/sem)</option>
                    <option value="intenso">Intenso (6-7 días/sem)</option>
                  </select>
                </div>
                <div>
                  <label className="text-purple-300 block mb-1">Objetivo</label>
                  <select 
                    value={form.objetivo} 
                    onChange={e => setForm({...form, objetivo: e.target.value as any})}
                    className="w-full bg-purple-900 border border-purple-700 rounded-xl p-2.5 text-white capitalize"
                  >
                    <option value="bajar">Bajar de peso</option>
                    <option value="mantener">Mantener peso</option>
                    <option value="subir">Subir de peso</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowOnboarding(false)}
                  className="px-4 py-2 rounded-xl bg-purple-900 text-purple-300 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-pink-500 text-white font-bold shadow-lg"
                >
                  Guardar y Recalcular
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Measurement Modal */}
      {showMeasureModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gradient-to-b from-purple-950 to-indigo-950 border border-purple-500/40 rounded-3xl p-6 max-w-sm w-full text-white shadow-2xl space-y-4">
            <h3 className="text-lg font-bold">Registrar Medidas</h3>
            <form onSubmit={handleSaveMeasurement} className="space-y-3 text-xs">
              <div>
                <label className="text-purple-300 block mb-1">Peso Actual (kg)</label>
                <input type="number" step="0.1" value={newWeight} onChange={e => setNewWeight(Number(e.target.value))} className="w-full bg-purple-900 border border-purple-700 rounded-xl p-2 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-purple-300 block mb-1">Cintura (cm)</label>
                  <input type="number" value={cintura} onChange={e => setCintura(Number(e.target.value))} className="w-full bg-purple-900 border border-purple-700 rounded-xl p-2 text-white" />
                </div>
                <div>
                  <label className="text-purple-300 block mb-1">Cadera (cm)</label>
                  <input type="number" value={cadera} onChange={e => setCadera(Number(e.target.value))} className="w-full bg-purple-900 border border-purple-700 rounded-xl p-2 text-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-purple-300 block mb-1">Brazo (cm)</label>
                  <input type="number" value={brazo} onChange={e => setBrazo(Number(e.target.value))} className="w-full bg-purple-900 border border-purple-700 rounded-xl p-2 text-white" />
                </div>
                <div>
                  <label className="text-purple-300 block mb-1">Pecho (cm)</label>
                  <input type="number" value={pecho} onChange={e => setPecho(Number(e.target.value))} className="w-full bg-purple-900 border border-purple-700 rounded-xl p-2 text-white" />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button type="button" onClick={() => setShowMeasureModal(false)} className="px-3 py-2 rounded-xl bg-purple-900 text-purple-300">Cancelar</button>
                <button type="submit" className="px-5 py-2 rounded-xl bg-pink-500 font-bold text-white">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
