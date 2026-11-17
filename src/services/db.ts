import { 
  EventItem, TaskItem, FoodItem, MealLog, HealthProfile, 
  BodyMeasurement, NotificationItem, ChatMessage, UserSettings 
} from '../types/agenda';
import { INITIAL_EVENTS, INITIAL_TASKS, INITIAL_HEALTH_PROFILE, PERUVIAN_FOODS, INITIAL_ACHIEVEMENTS } from '../data/peruvianFoods';

// Local storage keys
const KEYS = {
  EVENTS: 'mia_events_v1',
  TASKS: 'mia_tasks_v1',
  HEALTH: 'mia_health_v1',
  FOODS: 'mia_foods_v1',
  MEALS: 'mia_meals_v1',
  MEASUREMENTS: 'mia_measurements_v1',
  NOTIFICATIONS: 'mia_notifications_v1',
  CHAT: 'mia_chat_v1',
  SETTINGS: 'mia_settings_v1',
  WATER: 'mia_water_v1',
  FAV_FOODS: 'mia_fav_foods_v1'
};

export const defaultSettings: UserSettings = {
  nombre: 'Mariel',
  email: 'mariel@agenda.inteligente.pe',
  whatsapp: '+51 987 654 321',
  push_enabled: true,
  quiet_hours_start: '22:00',
  quiet_hours_end: '06:00',
  notif_tareas: true,
  notif_logros: true,
  notif_resumen: true,
  supabase_url: '',
  supabase_anon_key: ''
};

export function getStoredSettings(): UserSettings {
  try {
    const data = localStorage.getItem(KEYS.SETTINGS);
    return data ? JSON.parse(data) : defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export function saveStoredSettings(settings: UserSettings) {
  localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
}

export function getStoredEvents(): EventItem[] {
  try {
    const data = localStorage.getItem(KEYS.EVENTS);
    return data ? JSON.parse(data) : INITIAL_EVENTS;
  } catch {
    return INITIAL_EVENTS;
  }
}

export function saveStoredEvents(events: EventItem[]) {
  localStorage.setItem(KEYS.EVENTS, JSON.stringify(events));
}

export function getStoredTasks(): TaskItem[] {
  try {
    const data = localStorage.getItem(KEYS.TASKS);
    return data ? JSON.parse(data) : INITIAL_TASKS;
  } catch {
    return INITIAL_TASKS;
  }
}

export function saveStoredTasks(tasks: TaskItem[]) {
  localStorage.setItem(KEYS.TASKS, JSON.stringify(tasks));
}

export function getStoredHealth(): HealthProfile {
  try {
    const data = localStorage.getItem(KEYS.HEALTH);
    return data ? JSON.parse(data) : INITIAL_HEALTH_PROFILE;
  } catch {
    return INITIAL_HEALTH_PROFILE;
  }
}

export function saveStoredHealth(profile: HealthProfile) {
  // Recalculate BMR and TDEE with Mifflin-St Jeor
  const { sexo, peso_actual, estatura, edad, nivel_actividad, objetivo, peso_meta } = profile;
  let bmr = 10 * peso_actual + 6.25 * estatura - 5 * edad;
  bmr = sexo === 'mujer' ? bmr - 161 : bmr + 5;

  const multipliers = {
    sedentario: 1.2,
    ligero: 1.375,
    moderado: 1.55,
    intenso: 1.725
  };
  const tdee = Math.round(bmr * (multipliers[nivel_actividad] || 1.55));
  
  let calorias_meta = tdee;
  if (objetivo === 'bajar') calorias_meta = tdee - 450;
  if (objetivo === 'subir') calorias_meta = tdee + 400;

  const updated: HealthProfile = {
    ...profile,
    bmr: Math.round(bmr),
    tdee,
    calorias_meta: Math.round(calorias_meta)
  };

  localStorage.setItem(KEYS.HEALTH, JSON.stringify(updated));
  return updated;
}

export function getStoredFoods(): FoodItem[] {
  try {
    const data = localStorage.getItem(KEYS.FOODS);
    return data ? JSON.parse(data) : PERUVIAN_FOODS;
  } catch {
    return PERUVIAN_FOODS;
  }
}

export function saveStoredFood(food: FoodItem) {
  const foods = getStoredFoods();
  const exists = foods.findIndex(f => f.id === food.id);
  let updated;
  if (exists >= 0) {
    updated = foods.map(f => f.id === food.id ? food : f);
  } else {
    updated = [food, ...foods];
  }
  localStorage.setItem(KEYS.FOODS, JSON.stringify(updated));
  return updated;
}

export function getStoredMeals(fecha: string): MealLog[] {
  try {
    const data = localStorage.getItem(KEYS.MEALS);
    const all: MealLog[] = data ? JSON.parse(data) : [
      { id: 'm1', user_id: 'user_mariel', fecha: '2026-10-15', tipo_comida: 'desayuno', nombre: 'Pan con palta y huevo', cantidad: 1, unidad: 'porción', calorias: 340, proteinas: 9, carbohidratos: 38, grasas: 17 },
      { id: 'm2', user_id: 'user_mariel', fecha: '2026-10-15', tipo_comida: 'almuerzo', nombre: 'Pollo a la brasa (1/4 con papas y ensalada)', cantidad: 1, unidad: 'plato', calorias: 680, proteinas: 52, carbohidratos: 65, grasas: 28 },
    ];
    return all.filter(m => m.fecha === fecha);
  } catch {
    return [];
  }
}

export function addMealLog(meal: MealLog) {
  try {
    const data = localStorage.getItem(KEYS.MEALS);
    const all: MealLog[] = data ? JSON.parse(data) : [];
    const updated = [meal, ...all];
    localStorage.setItem(KEYS.MEALS, JSON.stringify(updated));
    return updated.filter(m => m.fecha === meal.fecha);
  } catch {
    return [];
  }
}

export function deleteMealLog(id: string, fecha: string) {
  try {
    const data = localStorage.getItem(KEYS.MEALS);
    const all: MealLog[] = data ? JSON.parse(data) : [];
    const updated = all.filter(m => m.id !== id);
    localStorage.setItem(KEYS.MEALS, JSON.stringify(updated));
    return updated.filter(m => m.fecha === fecha);
  } catch {
    return [];
  }
}

export function getStoredWater(fecha: string): number {
  try {
    const data = localStorage.getItem(KEYS.WATER);
    const map = data ? JSON.parse(data) : { '2026-10-15': 2000 };
    return map[fecha] || 0;
  } catch {
    return 0;
  }
}

export function updateStoredWater(fecha: string, ml: number) {
  try {
    const data = localStorage.getItem(KEYS.WATER);
    const map = data ? JSON.parse(data) : {};
    map[fecha] = Math.max(0, ml);
    localStorage.setItem(KEYS.WATER, JSON.stringify(map));
    return map[fecha];
  } catch {
    return ml;
  }
}

export function getStoredMeasurements(): BodyMeasurement[] {
  try {
    const data = localStorage.getItem(KEYS.MEASUREMENTS);
    return data ? JSON.parse(data) : [
      { id: 'ms1', fecha: '2026-10-01', peso: 63.5, cintura: 74, cadera: 98, brazo: 28, pecho: 90 },
      { id: 'ms2', fecha: '2026-10-08', peso: 63.0, cintura: 73.5, cadera: 97.5, brazo: 28.2, pecho: 90 },
      { id: 'ms3', fecha: '2026-10-15', peso: 62.5, cintura: 73, cadera: 97, brazo: 28.5, pecho: 91 },
    ];
  } catch {
    return [];
  }
}

export function saveMeasurement(m: BodyMeasurement) {
  const list = getStoredMeasurements();
  const updated = [m, ...list];
  localStorage.setItem(KEYS.MEASUREMENTS, JSON.stringify(updated));
  return updated;
}

export function getStoredNotifications(): NotificationItem[] {
  try {
    const data = localStorage.getItem(KEYS.NOTIFICATIONS);
    return data ? JSON.parse(data) : [
      { id: 'n1', user_id: 'user_mariel', tipo: 'entrenamiento', mensaje: 'Te quedan 30 min para asistir al GYM 🏋️‍♀️', programada_para: '06:30', enviada: true, leida: false },
      { id: 'n2', user_id: 'user_mariel', tipo: 'nutricion', mensaje: 'Hora de registrar tu almuerzo con proteínas 🥗', programada_para: '13:00', enviada: true, leida: false },
      { id: 'n3', user_id: 'user_mariel', tipo: 'logro', mensaje: '¡Felicidades! Completaste 7 días de disciplina 🏆', programada_para: '21:00', enviada: true, leida: true },
    ];
  } catch {
    return [];
  }
}

export function markNotificationRead(id: string) {
  const list = getStoredNotifications();
  const updated = list.map(n => n.id === id ? { ...n, leida: true } : n);
  localStorage.setItem(KEYS.NOTIFICATIONS, JSON.stringify(updated));
  return updated;
}

export function getStoredChat(): ChatMessage[] {
  try {
    const data = localStorage.getItem(KEYS.CHAT);
    return data ? JSON.parse(data) : [
      { id: 'c1', sender: 'assistant', text: '¡Hola Mariel! ¿Cómo te fue con tu lectura del Capítulo 5 de Un Curso de Milagros? ¿Qué enseñanza te llamó más la atención?', timestamp: '07:15' },
      { id: 'c2', sender: 'user', text: 'Me encantó el capítulo 5, aprendí a soltar el control y confiar en el proceso 💜', timestamp: '07:16' },
      { id: 'c3', sender: 'assistant', text: '¡Qué maravilla, Mariel! ✨ Registrado en tu diario de reflexiones. ¿Quieres continuar con tu día? ¿Necesitas programar algo?', timestamp: '07:16' },
    ];
  } catch {
    return [];
  }
}

export function saveStoredChat(messages: ChatMessage[]) {
  localStorage.setItem(KEYS.CHAT, JSON.stringify(messages));
}

// SQL Script generator for Supabase setup
export const SUPABASE_SQL_SCHEMA = `
-- SUPABASE SQL SCHEMA FOR MI AGENDA INTELIGENTE
-- Ejecuta este script en el SQL Editor de tu proyecto Supabase

create table if not exists perfiles (
  id uuid primary key default gen_random_uuid(),
  user_id text unique not null,
  nombre text not null,
  email text not null,
  whatsapp text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists perfil_salud (
  id uuid primary key default gen_random_uuid(),
  user_id text unique not null,
  sexo text check (sexo in ('mujer', 'hombre')) not null,
  edad integer not null,
  estatura numeric not null,
  peso_actual numeric not null,
  peso_meta numeric not null,
  fecha_meta date not null,
  nivel_actividad text not null,
  objetivo text not null,
  bmr numeric,
  tdee numeric,
  calorias_meta numeric,
  agua_meta_ml integer
);

create table if not exists eventos (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  titulo text not null,
  categoria text not null,
  color text not null,
  inicio text not null,
  fin text not null,
  fecha date not null,
  completado boolean default false,
  repeticion text,
  recordatorio_min integer,
  descripcion text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists tareas (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  titulo text not null,
  completada boolean default false,
  categoria text not null,
  fecha date not null
);

create table if not exists alimentos (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  porcion_base text not null,
  calorias numeric not null,
  proteinas numeric not null,
  carbohidratos numeric not null,
  grasas numeric not null,
  categoria text not null,
  favorito boolean default false
);

create table if not exists registro_comidas (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  fecha date not null,
  tipo_comida text not null,
  alimento_id uuid references alimentos(id),
  nombre text not null,
  cantidad numeric not null,
  unidad text not null,
  calorias numeric not null,
  proteinas numeric not null,
  carbohidratos numeric not null,
  grasas numeric not null
);

create table if not exists medidas (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  fecha date not null,
  peso numeric not null,
  cintura numeric not null,
  cadera numeric not null,
  brazo numeric not null,
  pecho numeric not null
);

create table if not exists suscripciones_push (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  endpoint text not null,
  keys jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create table if not exists notificaciones (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  tipo text not null,
  mensaje text not null,
  programada_para text not null,
  enviada boolean default false,
  leida boolean default false
);

create table if not exists diario (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  fecha timestamp with time zone default timezone('utc'::text, now()) not null,
  reflexion text not null
);

-- Habilitar RLS (Row Level Security)
alter table eventos enable row level security;
alter table tareas enable row level security;
alter table perfil_salud enable row level security;
alter table registro_comidas enable row level security;
alter table medidas enable row level security;
alter table notificaciones enable row level security;
alter table suscripciones_push enable row level security;
alter table diario enable row level security;

-- Políticas de acceso por usuario (auth.uid() o user_id)
create policy "Acceso propio eventos" on eventos for all using (true);
create policy "Acceso propio tareas" on tareas for all using (true);
create policy "Acceso propio perfil_salud" on perfil_salud for all using (true);
create policy "Acceso propio registro_comidas" on registro_comidas for all using (true);
create policy "Acceso propio medidas" on medidas for all using (true);
create policy "Acceso propio notificaciones" on notificaciones for all using (true);
create policy "Acceso propio suscripciones_push" on suscripciones_push for all using (true);
create policy "Acceso propio diario" on diario for all using (true);
create policy "Acceso libre alimentos" on alimentos for all using (true);
`;
