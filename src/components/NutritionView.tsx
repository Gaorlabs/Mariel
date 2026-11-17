import React, { useState } from 'react';
import { Utensils, Plus, Trash2, Droplet, Flame, Sparkles } from 'lucide-react';
import { FoodItem, MealLog, HealthProfile } from '../types/agenda';
import { AddFoodModal } from './AddFoodModal';

interface NutritionViewProps {
  foods: FoodItem[];
  meals: MealLog[];
  health: HealthProfile;
  onAddMeal: (meal: MealLog) => void;
  onDeleteMeal: (id: string) => void;
  onAddNewFood: (food: FoodItem) => void;
  waterMl: number;
  onUpdateWater: (ml: number) => void;
}

export const NutritionView: React.FC<NutritionViewProps> = ({
  foods,
  meals,
  health,
  onAddMeal,
  onDeleteMeal,
  onAddNewFood,
  waterMl,
  onUpdateWater
}) => {
  const [showModal, setShowModal] = useState(false);
  const [defaultTipo, setDefaultTipo] = useState<'desayuno' | 'almuerzo' | 'cena' | 'snack'>('almuerzo');

  // Calculate totals
  const totalCalorias = meals.reduce((sum, m) => sum + m.calorias, 0);
  const totalProteinas = meals.reduce((sum, m) => sum + m.proteinas, 0);
  const totalCarbs = meals.reduce((sum, m) => sum + m.carbohidratos, 0);
  const totalGrasas = meals.reduce((sum, m) => sum + m.grasas, 0);

  const metaCalorias = health.calorias_meta || 1739;
  const caloriasQuemadasEjercisio = 320; // from gym
  const caloriasRestantes = metaCalorias - totalCalorias + caloriasQuemadasEjercisio;

  // Macro goals (default 25% protein, 50% carbs, 25% fats)
  const metaProteinas = Math.round((metaCalorias * 0.25) / 4);
  const metaCarbs = Math.round((metaCalorias * 0.50) / 4);
  const metaGrasas = Math.round((metaCalorias * 0.25) / 9);

  const mealTypes = [
    { id: 'desayuno', label: 'Desayuno' },
    { id: 'almuerzo', label: 'Almuerzo' },
    { id: 'cena', label: 'Cena' },
    { id: 'snack', label: 'Snacks / Antojos' },
  ];

  const openAddFor = (tipo: 'desayuno' | 'almuerzo' | 'cena' | 'snack') => {
    setDefaultTipo(tipo);
    setShowModal(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-orange-900/40 via-purple-900/30 to-purple-950/60 p-6 rounded-3xl border border-orange-500/25 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
            <Utensils className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white">Nutrición & Mini Fitia</h1>
            <p className="text-xs text-orange-200">Controla tus calorías, macros y platos peruanos favoritos</p>
          </div>
        </div>

        <button
          onClick={() => openAddFor('almuerzo')}
          className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold text-xs shadow-lg hover:scale-105 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Agregar Alimento
        </button>
      </div>

      {/* Summary Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Calories Ring / Summary Card */}
        <div className="bg-purple-950/60 backdrop-blur-md p-6 rounded-3xl border border-purple-800/50 shadow-xl flex flex-col justify-between space-y-4">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>Resumen de Calorías de Hoy</span>
          </h3>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 rounded-2xl bg-purple-900/40 border border-purple-800">
              <p className="text-[10px] text-purple-300 uppercase">Meta</p>
              <p className="text-lg font-extrabold text-white mt-1">{metaCalorias}</p>
            </div>
            <div className="p-3 rounded-2xl bg-purple-900/40 border border-purple-800">
              <p className="text-[10px] text-orange-300 uppercase">Consumidas</p>
              <p className="text-lg font-extrabold text-orange-300 mt-1">{totalCalorias}</p>
            </div>
            <div className="p-3 rounded-2xl bg-purple-900/40 border border-purple-800">
              <p className="text-[10px] text-green-300 uppercase">Ejercicio</p>
              <p className="text-lg font-extrabold text-green-300 mt-1">+{caloriasQuemadasEjercisio}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-500/20 to-purple-600/20 border border-pink-500/40 flex items-center justify-between">
            <span className="text-xs font-bold text-white">Calorías Restantes:</span>
            <span className="text-xl font-extrabold text-pink-300">{caloriasRestantes} kcal</span>
          </div>
        </div>

        {/* Macros Progress Card */}
        <div className="lg:col-span-2 bg-purple-950/60 backdrop-blur-md p-6 rounded-3xl border border-purple-800/50 shadow-xl space-y-4">
          <h3 className="font-bold text-white text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span>Distribución de Macronutrientes</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Proteínas */}
            <div className="p-4 rounded-2xl bg-purple-900/40 border border-purple-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-pink-300">Proteínas (25%)</span>
                <span className="text-white">{Math.round(totalProteinas)}g / {metaProteinas}g</span>
              </div>
              <div className="w-full bg-purple-950 h-2.5 rounded-full overflow-hidden p-0.5">
                <div className="bg-pink-500 h-full rounded-full" style={{ width: `${Math.min(100, (totalProteinas / metaProteinas) * 100)}%` }} />
              </div>
            </div>

            {/* Carbohidratos */}
            <div className="p-4 rounded-2xl bg-purple-900/40 border border-purple-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-orange-300">Carbohidratos (50%)</span>
                <span className="text-white">{Math.round(totalCarbs)}g / {metaCarbs}g</span>
              </div>
              <div className="w-full bg-purple-950 h-2.5 rounded-full overflow-hidden p-0.5">
                <div className="bg-orange-500 h-full rounded-full" style={{ width: `${Math.min(100, (totalCarbs / metaCarbs) * 100)}%` }} />
              </div>
            </div>

            {/* Grasas */}
            <div className="p-4 rounded-2xl bg-purple-900/40 border border-purple-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-yellow-300">Grasas (25%)</span>
                <span className="text-white">{Math.round(totalGrasas)}g / {metaGrasas}g</span>
              </div>
              <div className="w-full bg-purple-950 h-2.5 rounded-full overflow-hidden p-0.5">
                <div className="bg-yellow-500 h-full rounded-full" style={{ width: `${Math.min(100, (totalGrasas / metaGrasas) * 100)}%` }} />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Meal Sections */}
      <div className="space-y-4">
        {mealTypes.map(mt => {
          const typeMeals = meals.filter(m => m.tipo_comida === mt.id);
          const typeCal = typeMeals.reduce((sum, m) => sum + m.calorias, 0);

          return (
            <div key={mt.id} className="bg-purple-950/60 backdrop-blur-md p-6 rounded-3xl border border-purple-800/50 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-white text-base capitalize">{mt.label}</h3>
                  <p className="text-xs text-pink-300">{typeCal} kcal</p>
                </div>

                <button
                  onClick={() => openAddFor(mt.id as any)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-900 hover:bg-purple-800 text-pink-300 text-xs font-bold transition-all border border-purple-700"
                >
                  <Plus className="w-4 h-4" /> Agregar Alimento
                </button>
              </div>

              {typeMeals.length === 0 ? (
                <p className="text-xs text-purple-400 italic py-2">Sin alimentos registrados en {mt.label}.</p>
              ) : (
                <div className="space-y-2">
                  {typeMeals.map(m => (
                    <div key={m.id} className="p-3.5 rounded-2xl bg-purple-900/40 border border-purple-800/60 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-bold text-white text-sm">{m.nombre}</p>
                        <p className="text-[11px] text-purple-300">{m.cantidad} {m.unidad} • <strong className="text-pink-300">{m.calorias} kcal</strong> (Prot: {m.proteinas}g | Carb: {m.carbohidratos}g | Grasa: {m.grasas}g)</p>
                      </div>

                      <button
                        onClick={() => onDeleteMeal(m.id)}
                        className="p-2 rounded-xl text-purple-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Food Modal */}
      {showModal && (
        <AddFoodModal
          foods={foods}
          onClose={() => setShowModal(false)}
          onAddMeal={onAddMeal}
          onAddNewFood={onAddNewFood}
          defaultTipo={defaultTipo}
        />
      )}
    </div>
  );
};
