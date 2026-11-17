import React from 'react';
import { Trophy, Dumbbell, BookOpen, CheckCircle2, Moon, Sparkles } from 'lucide-react';
import { AchievementItem } from '../types/agenda';
import { INITIAL_ACHIEVEMENTS } from '../data/peruvianFoods';

export const AchievementsView: React.FC = () => {
  const achievements = INITIAL_ACHIEVEMENTS;

  return (
    <div className="space-y-6 animate-fadeIn pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/60 via-purple-900/40 to-pink-900/50 p-8 rounded-3xl border border-purple-500/30 shadow-2xl text-center relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 text-purple-500/10">
          <Trophy className="w-48 h-48" />
        </div>
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-yellow-400 to-pink-500 flex items-center justify-center mx-auto text-white shadow-xl shadow-yellow-500/30 mb-4">
          <Trophy className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-white">Mis Logros & Metas</h1>
        <p className="text-sm text-pink-200 mt-2 max-w-lg mx-auto">
          "Tú puedes, Mariel! 🤍 Cada pequeño esfuerzo te acerca a tus grandes metas."
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-purple-950/60 backdrop-blur-md p-6 rounded-3xl border border-purple-800/50 shadow-xl text-center space-y-2">
          <Dumbbell className="w-8 h-8 text-pink-400 mx-auto" />
          <h3 className="text-2xl font-extrabold text-white">3</h3>
          <p className="text-xs text-purple-300">Entrenamientos esta semana</p>
        </div>

        <div className="bg-purple-950/60 backdrop-blur-md p-6 rounded-3xl border border-purple-800/50 shadow-xl text-center space-y-2">
          <BookOpen className="w-8 h-8 text-purple-400 mx-auto" />
          <h3 className="text-2xl font-extrabold text-white">5</h3>
          <p className="text-xs text-purple-300">Sesiones de lectura</p>
        </div>

        <div className="bg-purple-950/60 backdrop-blur-md p-6 rounded-3xl border border-purple-800/50 shadow-xl text-center space-y-2">
          <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto" />
          <h3 className="text-2xl font-extrabold text-white">7</h3>
          <p className="text-xs text-purple-300">Días en modo disciplina</p>
        </div>

        <div className="bg-purple-950/60 backdrop-blur-md p-6 rounded-3xl border border-purple-800/50 shadow-xl text-center space-y-2">
          <Moon className="w-8 h-8 text-indigo-400 mx-auto" />
          <h3 className="text-2xl font-extrabold text-white">8 h</h3>
          <p className="text-xs text-purple-300">Descanso promedio</p>
        </div>
      </div>

      {/* Achievements List */}
      <div className="bg-purple-950/60 backdrop-blur-md p-6 rounded-3xl border border-purple-800/50 shadow-xl space-y-4">
        <h2 className="font-bold text-white text-base mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <span>Insignias de Constancia</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map(ach => (
            <div key={ach.id} className="p-4 rounded-2xl bg-purple-900/40 border border-purple-800/60 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{ach.titulo}</h3>
                  <p className="text-xs text-purple-300">{ach.descripcion}</p>
                </div>
              </div>
              <span className="text-xs font-extrabold px-3 py-1.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40">
                {ach.progreso} / {ach.meta}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
