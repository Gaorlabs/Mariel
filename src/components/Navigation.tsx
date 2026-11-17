import React from 'react';
import { 
  Calendar as CalendarIcon, 
  CheckSquare, 
  Sparkles, 
  BarChart3, 
  Settings as SettingsIcon, 
  Home, 
  HeartPulse, 
  Utensils, 
  MessageSquare, 
  Trophy, 
  Bell,
  Menu,
  X
} from 'lucide-react';
import { NotificationItem, UserSettings } from '../types/agenda';

interface NavigationProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  notifications: NotificationItem[];
  onOpenNotifications: () => void;
  settings: UserSettings;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  setCurrentTab,
  notifications,
  onOpenNotifications,
  settings
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const unreadCount = notifications.filter(n => !n.leida).length;

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'calendario', label: 'Calendario', icon: CalendarIcon },
    { id: 'tareas', label: 'Tareas', icon: CheckSquare },
    { id: 'salud', label: 'Mi Salud', icon: HeartPulse },
    { id: 'nutricion', label: 'Nutrición', icon: Utensils },
    { id: 'logros', label: 'Logros', icon: Trophy },
    { id: 'asistente', label: 'Asistente IA', icon: MessageSquare },
    { id: 'reportes', label: 'Reportes', icon: BarChart3 },
    { id: 'configuracion', label: 'Configuración', icon: SettingsIcon },
  ];

  const mobileBottomItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'calendario', label: 'Calendario', icon: CalendarIcon },
    { id: 'salud', label: 'Salud', icon: HeartPulse },
    { id: 'nutricion', label: 'Nutrición', icon: Utensils },
    { id: 'logros', label: 'Logros', icon: Trophy },
    { id: 'mas', label: 'Más', icon: Menu },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-gradient-to-b from-purple-950 via-purple-900 to-indigo-950 text-white p-6 shadow-2xl shrink-0 min-h-screen">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-400 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <CalendarIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg bg-gradient-to-r from-white via-pink-200 to-purple-200 bg-clip-text text-transparent">
              Mi Agenda Inteligente
            </h1>
            <p className="text-xs text-purple-300 font-medium">Organiza · Programa · Logra</p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="space-y-1.5 flex-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-purple-600/30 scale-[1.02]'
                    : 'text-purple-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-pink-300'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Quote Widget (matching Figma) */}
        <div className="mt-auto p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 text-purple-400/20">
            <Sparkles className="w-24 h-24" />
          </div>
          <p className="text-xs italic text-pink-200 font-medium leading-relaxed mb-2">
            "Tu tiempo es tu mayor activo 🤍"
          </p>
          <div className="flex items-center gap-2 pt-2 border-t border-white/10">
            <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center font-bold text-xs">
              {settings.nombre.charAt(0)}
            </div>
            <div className="text-xs truncate">
              <p className="font-semibold">{settings.nombre}</p>
              <p className="text-purple-300 text-[10px]">Sincronizado</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <header className="lg:hidden sticky top-0 z-40 bg-purple-950/90 backdrop-blur-md border-b border-purple-800/50 text-white px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center">
            <CalendarIcon className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-base bg-gradient-to-r from-white to-pink-200 bg-clip-text text-transparent">
            Mi Agenda
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenNotifications}
            className="relative p-2 rounded-xl bg-purple-900/60 border border-purple-700/50 text-pink-200 hover:bg-purple-800"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-pink-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>
          
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pink-400 to-purple-400 p-0.5 shadow-md">
            <div className="w-full h-full rounded-full bg-purple-950 flex items-center justify-center font-bold text-xs text-pink-200">
              {settings.nombre.charAt(0)}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-purple-950/95 backdrop-blur-lg border-t border-purple-800/60 px-2 py-2 flex items-center justify-around shadow-2xl">
        {mobileBottomItems.map((item) => {
          const Icon = item.icon;
          const isMore = item.id === 'mas';
          const isActive = currentTab === item.id || (isMore && ['tareas', 'salud', 'asistente', 'reportes', 'configuracion'].includes(currentTab));
          
          return (
            <button
              key={item.id}
              onClick={() => {
                if (isMore) {
                  setMobileMenuOpen(!mobileMenuOpen);
                } else {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }
              }}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
                isActive ? 'text-pink-300 font-semibold' : 'text-purple-300 hover:text-white'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-pink-400 scale-110' : 'text-purple-300'}`} />
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Mobile "Más" Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn">
          <div className="w-72 bg-gradient-to-b from-purple-950 to-indigo-950 text-white p-6 h-full shadow-2xl flex flex-col justify-between border-l border-purple-800">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-pink-200">Menú Completo</h3>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-purple-900 text-purple-200 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg'
                          : 'text-purple-200 hover:bg-white/10'
                      }`}
                    >
                      <Icon className="w-5 h-5 text-pink-300" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 text-xs text-pink-200 text-center">
              <p className="font-semibold mb-1">¡Hola, {settings.nombre}!</p>
              <p className="text-[10px] text-purple-300">Tu tiempo es tu mayor activo 🤍</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
