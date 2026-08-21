import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Character } from '../types';
import { CLASS_DETAILS } from '../data/characterData';
import { ClassIcon } from './ClassIcon';
import { Heart, Zap, Sword, Trash2, Eye, Bookmark, Sparkles, Scroll } from 'lucide-react';

interface DeckListProps {
  deck: Character[];
  activeId?: string;
  onSelectCharacter: (char: Character) => void;
  onRemoveFromDeck: (charId: string) => void;
  onClearDeck: () => void;
}

export const DeckList: React.FC<DeckListProps> = ({
  deck,
  activeId,
  onSelectCharacter,
  onRemoveFromDeck,
  onClearDeck,
}) => {
  if (deck.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto my-8 p-10 rounded-2xl alchemist-parchment alchemist-border text-center backdrop-blur-md shadow-2xl">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
          <Bookmark className="w-8 h-8" />
        </div>
        <h3 className="text-2xl font-bold font-uncial text-amber-300 mb-2 alchemist-gold-glow">
          Your Card Deck is Empty
        </h3>
        <p className="text-xs text-amber-200/70 max-w-md mx-auto font-sans leading-relaxed">
          No hero cards have been saved to your deck yet. Transmute new characters on the workbench and click <strong className="text-amber-400">"Save to Deck"</strong> to add them to your collection!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto my-8 space-y-6">
      {/* Header bar for My Deck */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-xl alchemist-parchment alchemist-border gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-lg font-bold">
            🎴
          </div>
          <div>
            <h2 className="text-xl font-bold font-uncial text-amber-300 alchemist-gold-glow">
              My Character Deck ({deck.length})
            </h2>
            <p className="text-[10px] uppercase tracking-widest text-amber-500/70 font-sans">
              Saved Player Cards Collection
            </p>
          </div>
        </div>

        <button
          onClick={onClearDeck}
          className="text-xs text-amber-500/60 hover:text-red-400 flex items-center gap-1.5 transition-colors cursor-pointer font-sans font-semibold uppercase tracking-wider px-3 py-1.5 rounded bg-stone-950/80 border border-amber-500/20"
        >
          <Trash2 className="w-3.5 h-3.5" /> Clear Deck
        </button>
      </div>

      {/* Grid of Saved Player Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence>
          {deck.map((char) => {
            const classInfo = CLASS_DETAILS[char.characterClass];
            const isActive = char.id === activeId;

            return (
              <motion.div
                key={char.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className={`relative rounded-xl alchemist-parchment alchemist-border p-5 flex flex-col justify-between transition-all group hover:border-amber-500/60 shadow-xl ${
                  isActive ? 'ring-2 ring-amber-500/80 border-amber-400/80' : ''
                }`}
              >
                {/* Top Player Card Header */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      {/* Avatar / Portrait Thumbnail */}
                      <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-stone-950 border border-amber-500/40 shrink-0">
                        {char.portraitUrl ? (
                          <img
                            src={char.portraitUrl}
                            alt={char.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className={`w-full h-full bg-gradient-to-br ${char.avatarColor} p-0.5 flex items-center justify-center`}>
                            <div className="w-full h-full bg-stone-950 rounded flex items-center justify-center text-amber-400">
                              <ClassIcon name={char.avatarIcon} className="w-6 h-6" />
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-400 font-sans">
                            {char.characterClass}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider text-amber-200/60 font-sans">
                            Lvl {char.level} {char.race}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold font-medieval text-amber-300 mt-0.5">
                          {char.name}
                        </h3>
                        <p className="text-[11px] text-amber-400/70 font-uncial italic">
                          {char.title}
                        </p>
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => onRemoveFromDeck(char.id)}
                      className="text-stone-500 hover:text-red-400 p-1.5 rounded hover:bg-stone-900 transition-colors cursor-pointer"
                      title="Remove card from deck"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Card Power Stats Bar: Health, Mana, Strength */}
                  <div className="grid grid-cols-3 gap-2 bg-stone-950/80 p-2.5 rounded-lg border border-amber-500/20 font-sans">
                    <div className="text-center">
                      <span className="text-[9px] uppercase tracking-widest text-red-400/80 font-bold flex items-center justify-center gap-1">
                        <Heart className="w-3 h-3 text-red-400" /> HP
                      </span>
                      <span className="text-xs font-bold font-mono text-red-300">{char.stats.hp}</span>
                    </div>

                    <div className="text-center border-x border-amber-500/20">
                      <span className="text-[9px] uppercase tracking-widest text-sky-400/80 font-bold flex items-center justify-center gap-1">
                        <Zap className="w-3 h-3 text-sky-400" /> MP
                      </span>
                      <span className="text-xs font-bold font-mono text-sky-300">{char.stats.mana}</span>
                    </div>

                    <div className="text-center">
                      <span className="text-[9px] uppercase tracking-widest text-amber-400/80 font-bold flex items-center justify-center gap-1">
                        <Sword className="w-3 h-3 text-amber-400" /> STR
                      </span>
                      <span className="text-xs font-bold font-mono text-amber-300">{char.stats.strength}</span>
                    </div>
                  </div>

                  {/* Backstory snippet */}
                  <p className="text-xs text-amber-100/70 italic font-serif line-clamp-2 bg-stone-900/50 p-2.5 rounded border border-amber-500/10">
                    "{char.backstory || 'No lore recorded.'}"
                  </p>
                </div>

                {/* Card Action */}
                <div className="mt-4 pt-3 border-t border-amber-500/15 flex items-center justify-between">
                  <span className="text-[10px] text-amber-500/50 font-mono">
                    ID: #{char.id.slice(-6).toUpperCase()}
                  </span>
                  <button
                    onClick={() => onSelectCharacter(char)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs uppercase font-sans tracking-wider font-bold transition-all cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" /> View Card
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};
