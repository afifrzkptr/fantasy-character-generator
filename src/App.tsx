import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Character, CharacterClass } from './types';
import { generateRandomCharacter } from './utils/characterGenerator';
import { CharacterCard } from './components/CharacterCard';
import { CharacterHistory } from './components/CharacterHistory';
import { DeckList } from './components/DeckList';
import { CLASS_DETAILS } from './data/characterData';
import { Dices, Sparkles, Filter, Bookmark, Flame } from 'lucide-react';

export default function App() {
  const [character, setCharacter] = useState<Character | null>(null);
  const [selectedClassFilter, setSelectedClassFilter] = useState<CharacterClass | 'All'>('All');
  const [history, setHistory] = useState<Character[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [activeTab, setActiveTab] = useState<'transmute' | 'deck'>('transmute');

  // Persistent Deck State
  const [deck, setDeck] = useState<Character[]>(() => {
    try {
      const saved = localStorage.getItem('aetheria_saved_deck');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('aetheria_saved_deck', JSON.stringify(deck));
    } catch (e) {
      console.warn('Failed to save deck to local storage:', e);
    }
  }, [deck]);

  // Generate initial character on load
  useEffect(() => {
    handleGenerateCharacter();
  }, []);

  const handleGenerateCharacter = () => {
    setIsRolling(true);

    setTimeout(() => {
      const preferredClass = selectedClassFilter === 'All' ? undefined : selectedClassFilter;
      const newChar = generateRandomCharacter(preferredClass);

      setCharacter(newChar);
      setHistory((prev) => [newChar, ...prev.slice(0, 9)]); // Keep last 10
      setIsRolling(false);
    }, 250);
  };

  const handleToggleSaveDeck = (charToSave: Character) => {
    setDeck((prev) => {
      const exists = prev.some((item) => item.id === charToSave.id);
      if (exists) {
        return prev.filter((item) => item.id !== charToSave.id);
      } else {
        return [charToSave, ...prev];
      }
    });
  };

  const handleRemoveFromDeck = (charId: string) => {
    setDeck((prev) => prev.filter((item) => item.id !== charId));
  };

  const handleClearDeck = () => {
    setDeck([]);
  };

  const handleSelectFromHistory = (char: Character) => {
    setCharacter(char);
    setActiveTab('transmute');
  };

  const handleClearHistory = () => {
    setHistory(character ? [character] : []);
  };

  const handleUpdatePortrait = (charId: string, portraitUrl: string) => {
    setCharacter((prev) => (prev && prev.id === charId ? { ...prev, portraitUrl } : prev));
    setHistory((prevHistory) =>
      prevHistory.map((item) => (item.id === charId ? { ...item, portraitUrl } : item))
    );
    setDeck((prevDeck) =>
      prevDeck.map((item) => (item.id === charId ? { ...item, portraitUrl } : item))
    );
  };

  const handleUpdateBackstory = (charId: string, backstory: string) => {
    setCharacter((prev) => (prev && prev.id === charId ? { ...prev, backstory } : prev));
    setHistory((prevHistory) =>
      prevHistory.map((item) => (item.id === charId ? { ...item, backstory } : item))
    );
    setDeck((prevDeck) =>
      prevDeck.map((item) => (item.id === charId ? { ...item, backstory } : item))
    );
  };

  const availableClasses: (CharacterClass | 'All')[] = [
    'All',
    'Warrior',
    'Mage',
    'Rogue',
    'Paladin',
    'Ranger',
    'Cleric',
    'Necromancer',
    'Bard',
    'Druid',
    'Monk',
    'Sorcerer',
    'Warlock',
  ];

  return (
    <div className="min-h-screen text-[#e2d9cd] flex flex-col font-sans selection:bg-amber-500 selection:text-black relative overflow-x-hidden">
      {/* Alchemist Ambient Vials & Candle Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-amber-700/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="fixed top-[40%] right-[-5%] w-[35%] h-[35%] bg-emerald-800/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Top Header - Alchemist Workbench Banner */}
      <header className="relative z-10 flex flex-col sm:flex-row items-center justify-between px-6 sm:px-10 py-5 border-b border-amber-500/20 bg-stone-950/80 backdrop-blur-md gap-4 shadow-xl">
        <div className="text-center sm:text-left flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-uncial text-xl shadow-inner shrink-0">
            ⚗️
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-[0.2em] uppercase text-amber-400 font-uncial alchemist-gold-glow">
              The Alchemist&apos;s Workbench
            </h1>
            <p className="text-[10px] uppercase tracking-[0.25em] text-amber-500/60 font-sans mt-0.5">
              Transmutation Altar & Player Card Crucible
            </p>
          </div>
        </div>

        {/* View Mode Navigation Tabs */}
        <div className="flex items-center gap-2 font-sans text-xs">
          <button
            onClick={() => setActiveTab('transmute')}
            className={`px-4 py-2 rounded-lg font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'transmute'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'bg-stone-900/80 text-amber-200/60 hover:text-amber-100 border border-amber-500/20'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>Crucible</span>
          </button>

          <button
            id="view-deck-tab"
            onClick={() => setActiveTab('deck')}
            className={`px-4 py-2 rounded-lg font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'deck'
                ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                : 'bg-stone-900/80 text-amber-200/60 hover:text-amber-100 border border-amber-500/20'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>My Deck ({deck.length})</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 flex flex-col items-center">
        {activeTab === 'transmute' ? (
          <>
            {/* Controls Bar (Class Filter & Transmutation Button) */}
            <div className="w-full max-w-2xl mb-8 space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3.5 rounded-xl alchemist-parchment alchemist-border backdrop-blur-md shadow-lg">
                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <Filter className="w-4 h-4 text-amber-400 shrink-0 ml-1" />
                  <span className="text-[11px] font-semibold text-amber-200/70 uppercase tracking-widest shrink-0 font-sans">
                    Transmutation Essence:
                  </span>
                  <select
                    id="class-filter-select"
                    value={selectedClassFilter}
                    onChange={(e) => setSelectedClassFilter(e.target.value as CharacterClass | 'All')}
                    className="bg-stone-950 border border-amber-500/30 text-amber-200 text-xs rounded px-3 py-2 focus:ring-1 focus:ring-amber-500 focus:outline-none w-full sm:w-44 cursor-pointer font-sans uppercase tracking-wider font-semibold"
                  >
                    {availableClasses.map((cls) => (
                      <option key={cls} value={cls}>
                        {cls === 'All' ? '🎲 Any Essence' : cls}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="text-[11px] text-amber-500/60 uppercase tracking-widest font-sans hidden sm:block">
                  {deck.length > 0 ? `${deck.length} Saved in Deck` : 'Workbench Ready'}
                </div>
              </div>

              {/* Primary High-Impact Transmute Button */}
              <motion.button
                id="generate-character-btn"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerateCharacter}
                disabled={isRolling}
                className="w-full py-4 sm:py-5 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-uncial font-bold uppercase tracking-[0.3em] text-sm sm:text-base transition-all duration-300 shadow-[0_0_35px_rgba(217,119,6,0.35)] hover:shadow-[0_0_55px_rgba(217,119,6,0.55)] flex items-center justify-center gap-3 rounded-lg border border-amber-300/40 cursor-pointer disabled:opacity-70"
              >
                <span>{isRolling ? 'Transmuting Hero...' : 'Transmute New Hero'}</span>
                <Dices className={`w-5 h-5 text-stone-950 ${isRolling ? 'animate-spin' : ''}`} />
              </motion.button>
            </div>

            {/* Display Current Character Card */}
            {character && (
              <CharacterCard
                character={character}
                isInDeck={deck.some((item) => item.id === character.id)}
                onToggleSaveDeck={handleToggleSaveDeck}
                onUpdatePortrait={handleUpdatePortrait}
                onUpdateBackstory={handleUpdateBackstory}
              />
            )}

            {/* History / Roster Section */}
            <CharacterHistory
              history={history}
              activeId={character?.id || ''}
              onSelect={handleSelectFromHistory}
              onClear={handleClearHistory}
            />
          </>
        ) : (
          /* My Deck List View */
          <DeckList
            deck={deck}
            activeId={character?.id}
            onSelectCharacter={(char) => {
              setCharacter(char);
              setActiveTab('transmute');
            }}
            onRemoveFromDeck={handleRemoveFromDeck}
            onClearDeck={handleClearDeck}
          />
        )}
      </main>

      {/* Footer / Status Bar */}
      <footer className="relative z-10 px-6 sm:px-10 py-4 border-t border-amber-500/10 flex flex-col sm:flex-row justify-between items-center text-[10px] font-sans uppercase tracking-widest text-amber-500/50 gap-2">
        <div className="flex gap-6">
          <span>Card Seed: #{character?.id.slice(-6).toUpperCase() || 'INITIAL'}</span>
          <span>Deck Size: {deck.length} Cards</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Alchemist Player Card Forge Active</span>
        </div>
      </footer>
    </div>
  );
}
