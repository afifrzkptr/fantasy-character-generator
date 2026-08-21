import React from 'react';
import { Character } from '../types';
import { CLASS_DETAILS } from '../data/characterData';
import { ClassIcon } from './ClassIcon';
import { History, Trash2 } from 'lucide-react';

interface CharacterHistoryProps {
  history: Character[];
  activeId: string;
  onSelect: (char: Character) => void;
  onClear: () => void;
}

export const CharacterHistory: React.FC<CharacterHistoryProps> = ({
  history,
  activeId,
  onSelect,
  onClear,
}) => {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-4 rounded-xl alchemist-parchment alchemist-border backdrop-blur-sm shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[10px] uppercase tracking-[0.2em] text-amber-400/80 font-sans font-bold flex items-center gap-1.5">
          <History className="w-3.5 h-3.5 text-amber-400" /> Transmutation Ledger ({history.length})
        </h3>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="text-[10px] uppercase tracking-widest text-amber-500/50 hover:text-red-400 flex items-center gap-1 transition-colors cursor-pointer font-sans font-medium"
          >
            <Trash2 className="w-3 h-3" /> Clear Vault
          </button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-amber-900/40 scrollbar-track-transparent">
        {history.map((char) => {
          const isActive = char.id === activeId;

          return (
            <button
              key={char.id}
              onClick={() => onSelect(char)}
              className={`shrink-0 flex items-center gap-2.5 px-3 py-2 rounded-lg border text-left transition-all cursor-pointer font-sans ${
                isActive
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-200 shadow-md shadow-amber-500/10'
                  : 'bg-stone-950/60 border-amber-500/15 hover:bg-stone-900/80 text-amber-200/60 hover:text-amber-100'
              }`}
            >
              <div
                className={`w-8 h-8 rounded bg-gradient-to-br ${char.avatarColor} p-0.5 flex items-center justify-center overflow-hidden shrink-0 border border-amber-500/30`}
              >
                {char.portraitUrl ? (
                  <img
                    src={char.portraitUrl}
                    alt={char.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover rounded-[3px]"
                  />
                ) : (
                  <div className="w-full h-full bg-stone-950 rounded-[3px] flex items-center justify-center text-amber-400">
                    <ClassIcon name={char.avatarIcon} className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              <div>
                <div className="text-xs font-bold leading-tight font-medieval text-amber-300">{char.name}</div>
                <div className="text-[10px] text-amber-400/60 font-sans">
                  Lvl {char.level} {char.characterClass}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
