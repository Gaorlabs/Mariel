import React, { useState } from 'react';
import { Search, Plus, Barcode, X, Check } from 'lucide-react';
import { FoodItem, MealLog, HealthProfile } from '../types/agenda';

interface AddFoodModalProps {
  foods: FoodItem[];
  onClose: () => void;
  onAddMeal: (meal: MealLog) => void;
  onAddNewFood: (food: FoodItem) => void;
  defaultTipo: 'desayuno' | 'almuerzo' | 'cena' | 'snack';
}

export const AddFoodModal: React.FC<AddFoodModalProps> = ({
  foods,
  onClose,
  onAddMeal,
  onAddNewFood,
  defaultTipo
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tipoComida, setTipoComida] = useState<'desayuno' | 'almuerzo' | 'cena' | 'snack'>(defaultTipo);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [cantidad, setCantidad] = useState(1);
  const [activeTab, setActiveTab] = useState<'buscar' | 'crear' | 'barcode'>('buscar');

  // Custom food form
  const [customName, setCustomName] = useState('');
  const [customPorcion, setCustomPorcion] = useState('1 porción (100g)');
  const [customCal, setCustomCal] = useState(250);
  const [customProt, setCustomProt] = useState(15);
  const [customCarb, setCustomCarb] = useState(30);
  const [customGrasa, setCustomGrasa] = useState(8);

  const filteredFoods = foods.filter(f => f.nombre.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleAdd = () => {
    if (!selectedFood) return;
    const mult = Number(cantidad) || 1;
    const newMeal: MealLog = {
      id: 'ml_' + Date.now(),
      user_id: 'user_mariel',
      fecha: '2026-10-15',
      tipo_comida: tipoComida,
      alimento_id: selectedFood.id,
      nombre: selectedFood.nombre,
      cantidad: mult,
      unidad: selectedFood.porcion_base,
      calorias: Math.round(selectedFood.calorias * mult),
      proteinas: Number((selectedFood.proteinas * mult).toFixed(1)),
      carbohidratos: Number((selectedFood.carbohidratos * mult).toFixed(1)),
      grasas: Number((selectedFood.grasas * mult).toFixed(1))
    };
    onAddMeal(newMeal);
    onClose();
  };

  const handleCreateCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;
    const newFood: FoodItem = {
      id: 'cf_' + Date.now(),
      nombre: customName.trim(),
      porcion_base: customPorcion,
      calorias: Number(customCal),
      proteinas: Number(customProt),
      carbohidratos: Number(customCarb),
      grasas: Number(customGrasa),
      categoria: 'otro',
      favorito: true
    };
    onAddNewFood(newFood);
    setSelectedFood(newFood);
    setActiveTab('buscar');
  };

  const handleSimulateBarcode = () => {
    // Pick a random Peruvian favorite like Ceviche or Pollo a la brasa
    const randomFood = foods[Math.floor(Math.random() * 5)];
    setSelectedFood(randomFood);
    setActiveTab('buscar');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-gradient-to-b from-purple-950 to-indigo-950 border border-purple-500/40 rounded-3xl p-6 max-w-xl w-full text-white shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold">Agregar Alimento</h3>
          <button onClick={onClose} className="p-2 rounded-xl bg-purple-900 text-purple-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Meal Type Selector */}
        <div>
          <label className="text-xs text-purple-300 block mb-1">Momento del día</label>
          <div className="grid grid-cols-4 gap-2">
            {(['desayuno', 'almuerzo', 'cena', 'snack'] as const).map(t => (
              <button
                key={t}
                type="button"
                onClick={() => setTipoComida(t)}
                className={`py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                  tipoComida === t ? 'bg-pink-500 text-white shadow-md' : 'bg-purple-900/50 text-purple-300 hover:bg-purple-900'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Tabs: Buscar / Crear / Código de barras */}
        <div className="flex items-center gap-2 border-b border-purple-800 pb-3">
          <button
            onClick={() => setActiveTab('buscar')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'buscar' ? 'bg-purple-800 text-white' : 'text-purple-400'}`}
          >
            Buscador Peruano
          </button>
          <button
            onClick={() => setActiveTab('crear')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${activeTab === 'crear' ? 'bg-purple-800 text-white' : 'text-purple-400'}`}
          >
            Crear Plato Propios
          </button>
          <button
            onClick={() => { setActiveTab('barcode'); handleSimulateBarcode(); }}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${activeTab === 'barcode' ? 'bg-purple-800 text-white' : 'text-purple-400'}`}
          >
            <Barcode className="w-4 h-4" /> Escanear Código
          </button>
        </div>

        {activeTab === 'buscar' && (
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-purple-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Buscar lomo saltado, pollo a la brasa, quinua..."
                className="w-full bg-purple-900/50 border border-purple-700/60 rounded-2xl pl-10 pr-4 py-3 text-white text-xs placeholder-purple-400 focus:outline-none focus:border-pink-500"
              />
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {filteredFoods.map(f => {
                const isSelected = selectedFood?.id === f.id;
                return (
                  <div
                    key={f.id}
                    onClick={() => setSelectedFood(f)}
                    className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected ? 'bg-pink-500/20 border-pink-500 text-white' : 'bg-purple-900/30 border-purple-800/60 hover:bg-purple-900/60 text-purple-200'
                    }`}
                  >
                    <div>
                      <p className="font-bold text-xs text-white">{f.nombre}</p>
                      <p className="text-[10px] text-pink-300">{f.porcion_base} • <strong className="text-white">{f.calorias} kcal</strong></p>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-pink-400" />}
                  </div>
                );
              })}
            </div>

            {selectedFood && (
              <div className="p-4 rounded-2xl bg-purple-900/60 border border-purple-700/60 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Cantidad / Porciones:</span>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    value={cantidad}
                    onChange={e => setCantidad(Number(e.target.value))}
                    className="w-20 bg-purple-950 border border-purple-700 rounded-xl px-3 py-1 text-white text-xs text-center font-bold"
                  />
                </div>
                <div className="flex justify-between text-[11px] text-pink-300">
                  <span>Proteínas: {Math.round(selectedFood.proteinas * cantidad)}g</span>
                  <span>Carbs: {Math.round(selectedFood.carbohidratos * cantidad)}g</span>
                  <span>Grasas: {Math.round(selectedFood.grasas * cantidad)}g</span>
                  <span className="font-bold text-white">Total: {Math.round(selectedFood.calorias * cantidad)} kcal</span>
                </div>
                <button
                  onClick={handleAdd}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs shadow-lg"
                >
                  Registrar en {tipoComida}
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'crear' && (
          <form onSubmit={handleCreateCustom} className="space-y-3 text-xs">
            <div>
              <label className="text-purple-300 block mb-1">Nombre del plato o alimento</label>
              <input type="text" value={customName} onChange={e => setCustomName(e.target.value)} placeholder="Ej. Batido proteico casero" className="w-full bg-purple-900 border border-purple-700 rounded-xl p-2.5 text-white" required />
            </div>
            <div>
              <label className="text-purple-300 block mb-1">Porción base</label>
              <input type="text" value={customPorcion} onChange={e => setCustomPorcion(e.target.value)} className="w-full bg-purple-900 border border-purple-700 rounded-xl p-2.5 text-white" />
            </div>
            <div className="grid grid-cols-4 gap-2">
              <div>
                <label className="text-purple-300 block mb-1">Calorías</label>
                <input type="number" value={customCal} onChange={e => setCustomCal(Number(e.target.value))} className="w-full bg-purple-900 border border-purple-700 rounded-xl p-2.5 text-white" />
              </div>
              <div>
                <label className="text-purple-300 block mb-1">Prot (g)</label>
                <input type="number" value={customProt} onChange={e => setCustomProt(Number(e.target.value))} className="w-full bg-purple-900 border border-purple-700 rounded-xl p-2.5 text-white" />
              </div>
              <div>
                <label className="text-purple-300 block mb-1">Carb (g)</label>
                <input type="number" value={customCarb} onChange={e => setCustomCarb(Number(e.target.value))} className="w-full bg-purple-900 border border-purple-700 rounded-xl p-2.5 text-white" />
              </div>
              <div>
                <label className="text-purple-300 block mb-1">Grasa (g)</label>
                <input type="number" value={customGrasa} onChange={e => setCustomGrasa(Number(e.target.value))} className="w-full bg-purple-900 border border-purple-700 rounded-xl p-2.5 text-white" />
              </div>
            </div>

            <button type="submit" className="w-full py-3 rounded-2xl bg-pink-500 text-white font-bold shadow-lg mt-2">
              Crear y Seleccionar Alimento
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
