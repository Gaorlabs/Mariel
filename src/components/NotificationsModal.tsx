import React from 'react';
import { Bell, X, Check, CheckCircle2 } from 'lucide-react';
import { NotificationItem } from '../types/agenda';

interface NotificationsModalProps {
  notifications: NotificationItem[];
  onClose: () => void;
  onMarkRead: (id: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  notifications,
  onClose,
  onMarkRead
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-gradient-to-b from-purple-950 to-indigo-950 border border-purple-500/40 rounded-3xl p-6 max-w-md w-full text-white shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
        
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <Bell className="w-5 h-5 text-pink-400" />
            <span>Notificaciones</span>
          </h3>
          <button onClick={onClose} className="p-2 rounded-xl bg-purple-900 text-purple-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          {notifications.length === 0 ? (
            <p className="text-center text-purple-300 py-8 text-xs">No tienes notificaciones pendientes.</p>
          ) : (
            notifications.map(n => (
              <div
                key={n.id}
                className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                  n.leida
                    ? 'bg-purple-900/20 border-purple-800/40 opacity-70'
                    : 'bg-purple-900/50 border-purple-700/60 shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                      {n.tipo}
                    </span>
                    <span className="text-[10px] text-purple-400">{n.programada_para}</span>
                  </div>
                  <p className="text-xs text-white font-medium">{n.mensaje}</p>
                </div>

                {!n.leida && (
                  <button
                    onClick={() => onMarkRead(n.id)}
                    className="p-2 rounded-xl bg-purple-800 text-pink-300 hover:bg-purple-700 transition-all shrink-0"
                    title="Marcar como leída"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
