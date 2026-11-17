import React, { useState } from 'react';
import { CheckSquare, Plus, CheckCircle2, Circle, Trash2 } from 'lucide-react';
import { TaskItem } from '../types/agenda';

interface TasksViewProps {
  tasks: TaskItem[];
  onToggleTask: (id: string) => void;
  onAddTask: (task: TaskItem) => void;
  onDeleteTask: (id: string) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({ tasks, onToggleTask, onAddTask, onDeleteTask }) => {
  const [newTitle, setNewTitle] = useState('');
  const [category, setCategory] = useState<'gym' | 'trabajo' | 'contenido' | 'compras' | 'negocio' | 'personal' | 'salud' | 'nutricion'>('trabajo');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newTask: TaskItem = {
      id: 't_' + Date.now(),
      user_id: 'user_mariel',
      titulo: newTitle.trim(),
      completada: false,
      categoria: category,
      fecha: '2026-10-15'
    };
    onAddTask(newTask);
    setNewTitle('');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12 max-w-4xl mx-auto">
      <div className="bg-purple-950/40 p-6 rounded-3xl border border-purple-800/40 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Tareas y Hábitos</h1>
            <p className="text-xs text-purple-300">Gestiona tus pendientes diarios y mantén tu racha</p>
          </div>
        </div>
      </div>

      {/* Add Task Form */}
      <form onSubmit={handleCreate} className="bg-purple-950/60 backdrop-blur-md p-6 rounded-3xl border border-purple-800/50 shadow-xl flex flex-col md:flex-row gap-4">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Escribe una nueva tarea o hábito..."
          className="flex-1 bg-purple-900/40 border border-purple-700/50 rounded-2xl px-4 py-3 text-white placeholder-purple-400 focus:outline-none focus:border-pink-500 text-sm"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as any)}
          className="bg-purple-900/40 border border-purple-700/50 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pink-500"
        >
          <option value="trabajo">Trabajo</option>
          <option value="gym">Gym</option>
          <option value="contenido">Contenido</option>
          <option value="compras">Compras</option>
          <option value="negocio">Negocio</option>
          <option value="personal">Personal</option>
          <option value="nutricion">Nutrición</option>
        </select>

        <button
          type="submit"
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 hover:scale-105 transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Agregar</span>
        </button>
      </form>

      {/* Tasks List */}
      <div className="bg-purple-950/60 backdrop-blur-md p-6 rounded-3xl border border-purple-800/50 shadow-xl space-y-3">
        <h2 className="font-bold text-white text-base mb-4">Tareas de Hoy</h2>

        {tasks.length === 0 ? (
          <p className="text-center text-purple-300 py-8 text-sm">No hay tareas pendientes. ¡Excelente trabajo!</p>
        ) : (
          tasks.map(task => (
            <div
              key={task.id}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                task.completada
                  ? 'bg-purple-900/20 border-purple-800/40 opacity-75'
                  : 'bg-purple-900/50 border-purple-700/50 hover:border-pink-500/50'
              }`}
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onToggleTask(task.id)}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                    task.completada ? 'bg-green-500 text-white' : 'border border-purple-500 text-transparent hover:border-pink-400'
                  }`}
                >
                  {task.completada ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                </button>
                <span className={`text-sm font-semibold text-white ${task.completada ? 'line-through text-purple-300' : ''}`}>
                  {task.titulo}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-purple-900 text-pink-300 font-bold border border-purple-700/50">
                  {task.categoria}
                </span>
                <button
                  onClick={() => onDeleteTask(task.id)}
                  className="p-2 rounded-xl text-purple-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
