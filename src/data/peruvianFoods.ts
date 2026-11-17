import { FoodItem, EventItem, TaskItem, AchievementItem, HealthProfile } from '../types/agenda';

export const PERUVIAN_FOODS: FoodItem[] = [
  { id: 'f1', nombre: 'Pollo a la brasa (1/4 con papas y ensalada)', porcion_base: '1 plato (450g)', calorias: 680, proteinas: 52, carbohidratos: 65, grasas: 28, categoria: 'peruano', favorito: true },
  { id: 'f2', nombre: 'Lomo saltado tradicional', porcion_base: '1 plato (350g)', calorias: 620, proteinas: 38, carbohidratos: 58, grasas: 24, categoria: 'peruano', favorito: true },
  { id: 'f3', nombre: 'Ceviche mixto clásico', porcion_base: '1 fuente (300g)', calorias: 340, proteinas: 44, carbohidratos: 22, grasas: 8, categoria: 'peruano', favorito: true },
  { id: 'f4', nombre: 'Quinua con leche / Quinua batida', porcion_base: '1 taza (250ml)', calorias: 220, proteinas: 8, carbohidratos: 36, grasas: 5, categoria: 'peruano', favorito: true },
  { id: 'f5', nombre: 'Arroz con pollo y huancaína', porcion_base: '1 plato (400g)', calorias: 590, proteinas: 32, carbohidratos: 68, grasas: 20, categoria: 'peruano', favorito: false },
  { id: 'f6', nombre: 'Ají de gallina con papa y huevo', porcion_base: '1 plato (350g)', calorias: 510, proteinas: 30, carbohidratos: 45, grasas: 22, categoria: 'peruano', favorito: true },
  { id: 'f7', nombre: 'Causa limeña de atún o pollo', porcion_base: '2 porciones (200g)', calorias: 320, proteinas: 18, carbohidratos: 38, grasas: 11, categoria: 'peruano', favorito: false },
  { id: 'f8', nombre: 'Seco de carne con frijoles y arroz', porcion_base: '1 plato (450g)', calorias: 650, proteinas: 42, carbohidratos: 75, grasas: 18, categoria: 'peruano', favorito: false },
  { id: 'f9', nombre: 'Anticuchos de corazón con papa dorada', porcion_base: '1 porción (3 palitos)', calorias: 380, proteinas: 40, carbohidratos: 28, grasas: 12, categoria: 'peruano', favorito: true },
  { id: 'f10', nombre: 'Papa a la huancaína (2 rodajas)', porcion_base: '1 porción (180g)', calorias: 290, proteinas: 6, carbohidratos: 25, grasas: 18, categoria: 'peruano', favorito: false },
  { id: 'f11', nombre: 'Arroz blanco cocido', porcion_base: '1 taza (150g)', calorias: 195, proteinas: 4, carbohidratos: 43, grasas: 0.4, categoria: 'carbohidrato', favorito: false },
  { id: 'f12', nombre: 'Pechuga de pollo a la plancha', porcion_base: '1 filete (150g)', calorias: 220, proteinas: 46, carbohidratos: 0, grasas: 3.5, categoria: 'proteina', favorito: true },
  { id: 'f13', nombre: 'Carne de res magra a la parrilla', porcion_base: '1 bistec (150g)', calorias: 270, proteinas: 42, carbohidratos: 0, grasas: 10, categoria: 'proteina', favorito: false },
  { id: 'f14', nombre: 'Huevos sancochados (2 unidades)', porcion_base: '2 unidades (100g)', calorias: 155, proteinas: 13, carbohidratos: 1.1, grasas: 11, categoria: 'desayuno', favorito: true },
  { id: 'f15', nombre: 'Pan con palta y huevo', porcion_base: '2 panes franceses + 1 palta', calorias: 340, proteinas: 9, carbohidratos: 38, grasas: 17, categoria: 'desayuno', favorito: true },
  { id: 'f16', nombre: 'Avena con manzana y canela', porcion_base: '1 tazón (300ml)', calorias: 240, proteinas: 7, carbohidratos: 45, grasas: 4, categoria: 'desayuno', favorito: true },
  { id: 'f17', nombre: 'Jugo de papaya o lúcuma con leche', porcion_base: '1 vaso (300ml)', calorias: 180, proteinas: 6, carbohidratos: 32, grasas: 3, categoria: 'desayuno', favorito: false },
  { id: 'f18', nombre: 'Ensalada fresca de lechuga, tomate y palta', porcion_base: '1 bol (200g)', calorias: 130, proteinas: 3, carbohidratos: 9, grasas: 9, categoria: 'vegetal', favorito: true },
  { id: 'f19', nombre: 'Plátano de seda (1 unidad)', porcion_base: '1 unidad (120g)', calorias: 105, proteinas: 1.3, carbohidratos: 27, grasas: 0.3, categoria: 'snack', favorito: true },
  { id: 'f20', nombre: 'Yogurt griego natural', porcion_base: '1 taza (200g)', calorias: 130, proteinas: 20, carbohidratos: 8, grasas: 2, categoria: 'snack', favorito: true },
  { id: 'f21', nombre: 'Choclo con queso andino', porcion_base: '1 porción (200g)', calorias: 310, proteinas: 12, carbohidratos: 44, grasas: 10, categoria: 'peruano', favorito: true },
  { id: 'f22', nombre: 'Tamal criollo de pollo o chancho', porcion_base: '1 unidad (180g)', calorias: 350, proteinas: 14, carbohidratos: 38, grasas: 16, categoria: 'peruano', favorito: false },
  { id: 'f23', nombre: 'Sopa criolla de carne', porcion_base: '1 plato (350ml)', calorias: 390, proteinas: 24, carbohidratos: 42, grasas: 14, categoria: 'peruano', favorito: false },
  { id: 'f24', nombre: 'Arroz chaufa de pollo', porcion_base: '1 plato (350g)', calorias: 580, proteinas: 28, carbohidratos: 64, grasas: 22, categoria: 'peruano', favorito: true },
  { id: 'f25', nombre: 'Tallarines verdes con bistec', porcion_base: '1 plato (400g)', calorias: 670, proteinas: 38, carbohidratos: 72, grasas: 25, categoria: 'peruano', favorito: false },
];

export const INITIAL_HEALTH_PROFILE: HealthProfile = {
  sexo: 'mujer',
  edad: 28,
  estatura: 165,
  peso_actual: 62.5,
  peso_meta: 58.0,
  fecha_meta: '2026-12-31',
  nivel_actividad: 'moderado',
  objetivo: 'bajar',
  bmr: 1380,
  tdee: 2139,
  calorias_meta: 1739,
  agua_meta_ml: 2500,
};

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'e1',
    user_id: 'user_mariel',
    titulo: 'Gym - Entrenamiento (Tren Superior)',
    categoria: 'gym',
    color: '#ec4899', // pink-500
    inicio: '07:00',
    fin: '08:00',
    fecha: '2026-10-15',
    completado: true,
    repeticion: 'diaria',
    recordatorio_min: 30,
    descripcion: 'Entrenamiento de fuerza y resistencia superior.'
  },
  {
    id: 'e2',
    user_id: 'user_mariel',
    titulo: 'Trabajo / Proyectos',
    categoria: 'trabajo',
    color: '#3b82f6', // blue-500
    inicio: '09:00',
    fin: '10:00',
    fecha: '2026-10-15',
    completado: true,
    repeticion: 'semanal',
    recordatorio_min: 15,
  },
  {
    id: 'e3',
    user_id: 'user_mariel',
    titulo: 'Crear contenido (Redes Sociales)',
    categoria: 'contenido',
    color: '#a855f7', // purple-500
    inicio: '11:00',
    fin: '12:00',
    fecha: '2026-10-15',
    completado: true,
    repeticion: 'ninguna',
    recordatorio_min: 10,
  },
  {
    id: 'e4',
    user_id: 'user_mariel',
    titulo: 'Compras / Proveedores',
    categoria: 'compras',
    color: '#22c55e', // green-500
    inicio: '14:00',
    fin: '15:00',
    fecha: '2026-10-15',
    completado: true,
    repeticion: 'ninguna',
    recordatorio_min: 15,
  },
  {
    id: 'e5',
    user_id: 'user_mariel',
    titulo: 'Cocina / Negocio Pollería',
    categoria: 'negocio',
    color: '#f97316', // orange-500
    inicio: '17:00',
    fin: '18:00',
    fecha: '2026-10-15',
    completado: true,
    repeticion: 'diaria',
    recordatorio_min: 20,
  },
  {
    id: 'e6',
    user_id: 'user_mariel',
    titulo: 'Tiempo para mí (Lectura/Oración)',
    categoria: 'personal',
    color: '#8b5cf6', // violet-500
    inicio: '19:00',
    fin: '20:30',
    fecha: '2026-10-15',
    completado: false,
    repeticion: 'diaria',
    recordatorio_min: 15,
  },
];

export const INITIAL_TASKS: TaskItem[] = [
  { id: 't1', user_id: 'user_mariel', titulo: 'Revisar inventario de pollería', completada: true, categoria: 'negocio', fecha: '2026-10-15' },
  { id: 't2', user_id: 'user_mariel', titulo: 'Grabar reel para Instagram', completada: true, categoria: 'contenido', fecha: '2026-10-15' },
  { id: 't3', user_id: 'user_mariel', titulo: 'Completar capítulo 5 de Un Curso de Milagros', completada: false, categoria: 'personal', fecha: '2026-10-15' },
  { id: 't4', user_id: 'user_mariel', titulo: 'Hacer compras de verduras frescas', completada: false, categoria: 'compras', fecha: '2026-10-15' },
  { id: 't5', user_id: 'user_mariel', titulo: 'Planificar menú semanal', completada: true, categoria: 'nutricion', fecha: '2026-10-15' },
];

export const INITIAL_ACHIEVEMENTS: AchievementItem[] = [
  { id: 'a1', titulo: 'Entrenamientos esta semana', descripcion: 'Constancia en el gimnasio', icono: 'Dumbbell', completado: true, progreso: 3, meta: 4 },
  { id: 'a2', titulo: 'Sesiones de lectura', descripcion: 'Crecimiento personal diario', icono: 'BookOpen', completado: true, progreso: 5, meta: 7 },
  { id: 'a3', titulo: 'Días en modo disciplina', descripcion: 'Racha impecable de hábitos', icono: 'CheckCircle2', completado: true, progreso: 7, meta: 7 },
  { id: 'a4', titulo: 'Descanso promedio', descripcion: 'Horas de sueño reparador', icono: 'Moon', completado: true, progreso: 8, meta: 8 },
];
