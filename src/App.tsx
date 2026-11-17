import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HomeView } from './components/HomeView';
import { CalendarView } from './components/CalendarView';
import { TasksView } from './components/TasksView';
import { HealthView } from './components/HealthView';
import { NutritionView } from './components/NutritionView';
import { AssistantView } from './components/AssistantView';
import { AchievementsView } from './components/AchievementsView';
import { SettingsView } from './components/SettingsView';
import { EventModal } from './components/EventModal';
import { ReminderModal } from './components/ReminderModal';
import { NotificationsModal } from './components/NotificationsModal';
import { 
  getStoredEvents, saveStoredEvents, 
  getStoredTasks, saveStoredTasks, 
  getStoredHealth, saveStoredHealth, 
  getStoredFoods, saveStoredFood, 
  getStoredMeals, addMealLog, deleteMealLog, 
  getStoredWater, updateStoredWater, 
  getStoredMeasurements, saveMeasurement, 
  getStoredNotifications, markNotificationRead, 
  getStoredChat, saveStoredChat, 
  getStoredSettings, saveStoredSettings 
} from './services/db';
import { EventItem, TaskItem, MealLog, FoodItem, BodyMeasurement, HealthProfile, ChatMessage, UserSettings, NotificationItem } from './types/agenda';
import { BarChart3 } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState('inicio');
  const [events, setEvents] = useState<EventItem[]>(getStoredEvents());
  const [tasks, setTasks] = useState<TaskItem[]>(getStoredTasks());
  const [health, setHealth] = useState<HealthProfile>(getStoredHealth());
  const [measurements, setMeasurements] = useState<BodyMeasurement[]>(getStoredMeasurements());
  const [foods, setFoods] = useState<FoodItem[]>(getStoredFoods());
  const [meals, setMeals] = useState<MealLog[]>(getStoredMeals('2026-10-15'));
  const [waterMl, setWaterMl] = useState<number>(getStoredWater('2026-10-15'));
  const [notifications, setNotifications] = useState<NotificationItem[]>(getStoredNotifications());
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(getStoredChat());
  const [settings, setSettings] = useState<UserSettings>(getStoredSettings());

  // Modals
  const [showEventModal, setShowEventModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(true); // Show reminder on open matching Figma
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  // Event handlers
  const handleToggleEvent = (id: string) => {
    const updated = events.map(e => e.id === id ? { ...e, completado: !e.completado } : e);
    setEvents(updated);
    saveStoredEvents(updated);
  };

  const handleSaveEvent = (newEvt: EventItem) => {
    const updated = [newEvt, ...events];
    setEvents(updated);
    saveStoredEvents(updated);
  };

  const handleToggleTask = (id: string) => {
    const updated = tasks.map(t => t.id === id ? { ...t, completada: !t.completada } : t);
    setTasks(updated);
    saveStoredTasks(updated);
  };

  const handleAddTask = (newTask: TaskItem) => {
    const updated = [newTask, ...tasks];
    setTasks(updated);
    saveStoredTasks(updated);
  };

  const handleDeleteTask = (id: string) => {
    const updated = tasks.filter(t => t.id !== id);
    setTasks(updated);
    saveStoredTasks(updated);
  };

  const handleUpdateHealth = (newProfile: HealthProfile) => {
    const saved = saveStoredHealth(newProfile);
    setHealth(saved);
  };

  const handleAddMeasurement = (m: BodyMeasurement) => {
    const updated = saveMeasurement(m);
    setMeasurements(updated);
  };

  const handleAddMeal = (meal: MealLog) => {
    const updated = addMealLog(meal);
    setMeals(updated);
  };

  const handleDeleteMeal = (id: string) => {
    const updated = deleteMealLog(id, '2026-10-15');
    setMeals(updated);
  };

  const handleAddNewFood = (food: FoodItem) => {
    const updated = saveStoredFood(food);
    setFoods(updated);
  };

  const handleUpdateWater = (ml: number) => {
    const val = updateStoredWater('2026-10-15', ml);
    setWaterMl(val);
  };

  const handleMarkNotificationRead = (id: string) => {
    const updated = markNotificationRead(id);
    setNotifications(updated);
  };

  const handleSendMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // AI Assistant auto reply
    const assistantReply: ChatMessage = {
      id: 'msg_ai_' + Date.now(),
      sender: 'assistant',
      text: `¡Excelente reflexión, ${settings.nombre}! ✨ He registrado tu nota en tu diario personal. ¿Te gustaría agendar una sesión en tu bloque de tarde o verificar tus macros?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...chatMessages, userMsg, assistantReply];
    setChatMessages(updated);
    saveStoredChat(updated);
  };

  const handleSaveSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
    saveStoredSettings(newSettings);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-950 to-slate-950 text-white flex flex-col lg:flex-row font-sans selection:bg-pink-500 selection:text-white">
      
      {/* Navigation Sidebar / Bottom Bar */}
      <Navigation
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        notifications={notifications}
        onOpenNotifications={() => setShowNotificationsModal(true)}
        settings={settings}
      />

      {/* Main Content View */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {currentTab === 'inicio' && (
          <HomeView
            events={events}
            tasks={tasks}
            onToggleEvent={handleToggleEvent}
            onOpenNewEvent={() => setShowEventModal(true)}
            onAutoSchedule={() => {
              // Auto schedule effect
            }}
            settings={settings}
            notificationsCount={notifications.filter(n => !n.leida).length}
            onOpenNotifications={() => setShowNotificationsModal(true)}
          />
        )}

        {currentTab === 'calendario' && (
          <CalendarView
            events={events}
            onOpenNewEvent={() => setShowEventModal(true)}
          />
        )}

        {currentTab === 'tareas' && (
          <TasksView
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
          />
        )}

        {currentTab === 'salud' && (
          <HealthView
            health={health}
            measurements={measurements}
            onUpdateHealth={handleUpdateHealth}
            onAddMeasurement={handleAddMeasurement}
            waterMl={waterMl}
            onUpdateWater={handleUpdateWater}
          />
        )}

        {currentTab === 'nutricion' && (
          <NutritionView
            foods={foods}
            meals={meals}
            health={health}
            onAddMeal={handleAddMeal}
            onDeleteMeal={handleDeleteMeal}
            onAddNewFood={handleAddNewFood}
            waterMl={waterMl}
            onUpdateWater={handleUpdateWater}
          />
        )}

        {currentTab === 'logros' && <AchievementsView />}

        {currentTab === 'asistente' && (
          <AssistantView
            messages={chatMessages}
            onSendMessage={handleSendMessage}
          />
        )}

        {currentTab === 'reportes' && (
          <div className="space-y-6 animate-fadeIn pb-12 max-w-4xl mx-auto">
            <div className="bg-purple-950/40 p-6 rounded-3xl border border-purple-800/40 shadow-xl flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Reportes de Productividad y Hábitos</h1>
                <p className="text-xs text-purple-300">Estadísticas semanales y mensuales de tu rendimiento</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-purple-950/60 p-6 rounded-3xl border border-purple-800/50 shadow-xl space-y-4">
                <h3 className="font-bold text-white text-base">Horas Productivas por Categoría</h3>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="flex justify-between text-purple-200 mb-1">
                      <span>Gym & Salud</span>
                      <span className="font-bold text-pink-300">7.5 hrs (30%)</span>
                    </div>
                    <div className="w-full bg-purple-900 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-pink-500 h-full rounded-full" style={{ width: '30%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-purple-200 mb-1">
                      <span>Trabajo & Proyectos</span>
                      <span className="font-bold text-blue-300">10 hrs (40%)</span>
                    </div>
                    <div className="w-full bg-purple-900 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: '40%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-purple-200 mb-1">
                      <span>Negocio Pollería</span>
                      <span className="font-bold text-orange-300">7.5 hrs (30%)</span>
                    </div>
                    <div className="w-full bg-purple-900 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-orange-500 h-full rounded-full" style={{ width: '30%' }} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-purple-950/60 p-6 rounded-3xl border border-purple-800/50 shadow-xl space-y-4">
                <h3 className="font-bold text-white text-base">Racha de Hábitos</h3>
                <p className="text-xs text-purple-200 leading-relaxed">
                  Has mantenido una constancia impecable en tus hábitos matutinos. ¡Sigue brillando, {settings.nombre}! 🌟
                </p>
                <div className="p-4 rounded-2xl bg-purple-900/40 border border-purple-700/50 text-center">
                  <p className="text-3xl font-black text-pink-300">7 Días</p>
                  <p className="text-xs text-purple-300 mt-1">Racha activa en modo disciplina</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentTab === 'configuracion' && (
          <SettingsView
            settings={settings}
            onSaveSettings={handleSaveSettings}
          />
        )}
      </main>

      {/* Modals */}
      {showEventModal && (
        <EventModal
          onClose={() => setShowEventModal(false)}
          onSave={handleSaveEvent}
        />
      )}

      {showReminderModal && (
        <ReminderModal
          onClose={() => setShowReminderModal(false)}
          onComenzar={() => {
            setShowReminderModal(false);
            setCurrentTab('salud');
          }}
        />
      )}

      {showNotificationsModal && (
        <NotificationsModal
          notifications={notifications}
          onClose={() => setShowNotificationsModal(false)}
          onMarkRead={handleMarkNotificationRead}
        />
      )}

    </div>
  );
}
