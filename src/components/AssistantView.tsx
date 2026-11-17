import React, { useState } from 'react';
import { MessageSquare, Send, Sparkles, Smile } from 'lucide-react';
import { ChatMessage } from '../types/agenda';

interface AssistantViewProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
}

export const AssistantView: React.FC<AssistantViewProps> = ({ messages, onSendMessage }) => {
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSendMessage(input.trim());
    setInput('');
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12 max-w-4xl mx-auto h-[82vh] flex flex-col">
      {/* Header */}
      <div className="bg-purple-950/60 backdrop-blur-md p-6 rounded-3xl border border-purple-800/50 shadow-xl flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-white shadow-lg">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              <span>Asistente Mariel</span>
              <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
            </h1>
            <p className="text-xs text-purple-300">En línea • Registra reflexiones y automatiza tu día con IA</p>
          </div>
        </div>
      </div>

      {/* Chat Messages Box */}
      <div className="flex-1 bg-purple-950/40 backdrop-blur-md border border-purple-800/50 rounded-3xl p-6 overflow-y-auto space-y-4 shadow-2xl flex flex-col">
        {messages.map(m => {
          const isUser = m.sender === 'user';
          return (
            <div key={m.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-3xl p-4 text-sm shadow-lg ${
                isUser
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-br-sm'
                  : 'bg-purple-900/60 border border-purple-700/60 text-purple-100 rounded-bl-sm'
              }`}>
                <p className="leading-relaxed">{m.text}</p>
                <span className={`text-[10px] block mt-1 text-right ${isUser ? 'text-pink-200' : 'text-purple-400'}`}>
                  {m.timestamp}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSend} className="bg-purple-950/60 backdrop-blur-md p-3 rounded-3xl border border-purple-800/50 shadow-xl flex items-center gap-3 shrink-0">
        <button type="button" className="p-3 rounded-2xl bg-purple-900/60 text-purple-300 hover:text-white">
          <Smile className="w-5 h-5" />
        </button>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Escribe un mensaje o reflexión del día..."
          className="flex-1 bg-transparent border-none text-white placeholder-purple-400 focus:outline-none text-sm px-2"
        />
        <button
          type="submit"
          className="p-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg hover:scale-105 transition-all"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
