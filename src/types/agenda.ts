export type CategoryType = 'gym' | 'trabajo' | 'contenido' | 'compras' | 'negocio' | 'personal' | 'salud' | 'nutricion';

export interface EventItem {
  id: string;
  user_id: string;
  titulo: string;
  categoria: CategoryType;
  color: string; // hex or tailwind class
  inicio: string; // ISO string or HH:mm
  fin: string; // HH:mm
  fecha: string; // YYYY-MM-DD
  completado: boolean;
  repeticion?: 'diaria' | 'semanal' | 'ninguna';
  recordatorio_min?: number;
  descripcion?: string;
}

export interface TaskItem {
  id: string;
  user_id: string;
  titulo: string;
  completada: boolean;
  categoria: CategoryType;
  fecha: string;
}

export interface AchievementItem {
  id: string;
  titulo: string;
  descripcion: string;
  icono: string;
  completado: boolean;
  progreso?: number;
  meta?: number;
}

export interface HealthProfile {
  sexo: 'mujer' | 'hombre';
  edad: number;
  estatura: number; // cm
  peso_actual: number; // kg
  peso_meta: number; // kg
  fecha_meta: string;
  nivel_actividad: 'sedentario' | 'ligero' | 'moderado' | 'intenso';
  objetivo: 'bajar' | 'mantener' | 'subir';
  bmr?: number;
  tdee?: number;
  calorias_meta?: number;
  agua_meta_ml?: number;
}

export interface BodyMeasurement {
  id: string;
  fecha: string;
  peso: number;
  cintura: number;
  cadera: number;
  brazo: number;
  pecho: number;
}

export interface FoodItem {
  id: string;
  nombre: string;
  porcion_base: string;
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
  categoria: 'peruano' | 'desayuno' | 'proteina' | 'carbohidrato' | 'vegetal' | 'snack' | 'otro';
  favorito?: boolean;
}

export interface MealLog {
  id: string;
  user_id: string;
  fecha: string;
  tipo_comida: 'desayuno' | 'almuerzo' | 'cena' | 'snack';
  alimento_id?: string;
  nombre: string;
  cantidad: number;
  unidad: string;
  calorias: number;
  proteinas: number;
  carbohidratos: number;
  grasas: number;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  tipo: 'tarea' | 'entrenamiento' | 'salud' | 'nutricion' | 'logro';
  mensaje: string;
  programada_para: string;
  enviada: boolean;
  leida: boolean;
}

export interface UserSettings {
  nombre: string;
  email: string;
  whatsapp: string;
  push_enabled: boolean;
  quiet_hours_start: string;
  quiet_hours_end: string;
  notif_tareas: boolean;
  notif_logros: boolean;
  notif_resumen: boolean;
  supabase_url: string;
  supabase_anon_key: string;
}
