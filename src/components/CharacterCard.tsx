import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Character } from '../types';
import { CLASS_DETAILS } from '../data/characterData';
import { ClassIcon } from './ClassIcon';
import {
  Heart,
  Zap,
  Sword,
  BookOpen,
  Copy,
  Check,
  ShieldAlert,
  Sparkles,
  Scroll,
  Loader2,
  RefreshCw,
  ImageIcon,
  Bookmark,
  BookmarkCheck,
  Crown,
} from 'lucide-react';

interface CharacterCardProps {
  character: Character;
  isInDeck: boolean;
  onToggleSaveDeck: (character: Character) => void;
  onUpdatePortrait: (characterId: string, portraitUrl: string) => void;
  onUpdateBackstory: (characterId: string, backstory: string) => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  isInDeck,
  onToggleSaveDeck,
  onUpdatePortrait,
  onUpdateBackstory,
}) => {
  const [copied, setCopied] = useState(false);
  const [isGeneratingPortrait, setIsGeneratingPortrait] = useState(false);
  const [isGeneratingBackstory, setIsGeneratingBackstory] = useState(false);
  const [portraitError, setPortraitError] = useState<string | null>(null);

  const classInfo = CLASS_DETAILS[character.characterClass];

  const generateFallbackBackstory = (char: Character): string => {
    const origins = [
      `Born during an unprecedented celestial eclipse, ${char.name} was secretly trained by ancient elders of the ${char.race} conclave before taking up the oath of the ${char.characterClass}.`,
      `Once an archivist in the sunken library of Oakhaven, ${char.name} unlocked forbidden arcane runes and now travels the realm as ${char.title}.`,
      `Driven from their homeland by encroaching shadow forces, ${char.name} wields their ${char.equipment[0] || 'relic'} in a relentless quest for vengeance and restoration.`,
      `Chosen by an ancient elemental spirit in the deep whisperwood, ${char.name} bound their soul to the ${char.characterClass} code to fulfill an unspoken prophecy.`,
      `Marked by dragon ember runes at birth, ${char.name} survived years of solitary wilderness pilgrimage before claiming the title of ${char.title}.`,
      `After discovering a sealed runic tablet in deep subterranean caverns, ${char.name} unlocked dormant celestial powers and embraced their destiny.`,
      `Exiled from the High Council for defying tyrannical decrees, ${char.name} now wanders the borderlands defending the helpless as ${char.title}.`
    ];
    return origins[Math.floor(Math.random() * origins.length)];
  };

  const handleGenerateBackstory = async () => {
    setIsGeneratingBackstory(true);

    try {
      const response = await fetch('/api/generate-backstory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: character.name,
          characterClass: character.characterClass,
          race: character.race,
          title: character.title,
          alignment: character.alignment,
          equipment: character.equipment,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.backstory) {
          onUpdateBackstory(character.id, data.backstory);
          setIsGeneratingBackstory(false);
          return;
        }
      }
    } catch (err) {
      console.warn('Backend backstory endpoint fallback:', err);
    }

    // Fallback backstory generator
    const newStory = generateFallbackBackstory(character);
    onUpdateBackstory(character.id, newStory);
    setIsGeneratingBackstory(false);
  };

  const handleCopy = () => {
    const summary = `${character.name}, ${character.title}\nClass: ${character.characterClass} | Race: ${character.race} | Level: ${character.level}\nAlignment: ${character.alignment}\nStats: STR ${character.stats.strength} | DEX ${character.stats.dexterity} | CON ${character.stats.constitution} | INT ${character.stats.intelligence} | WIS ${character.stats.wisdom} | CHA ${character.stats.charisma}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGeneratePortrait = async () => {
    setIsGeneratingPortrait(true);
    setPortraitError(null);
    const seed = Math.floor(Math.random() * 1000000);

    try {
      const response = await fetch('/api/generate-portrait', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: character.name,
          characterClass: character.characterClass,
          race: character.race,
          title: character.title,
          backstory: character.backstory,
          style: 'cartoon video game',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.imageUrl) {
          onUpdatePortrait(character.id, data.imageUrl);
          setIsGeneratingPortrait(false);
          return;
        }
      }
    } catch (err: any) {
      console.warn('Backend image generation fallback triggering:', err);
    }

    // High quality cartoon video game fallback generator
    const prompt = `cartoon video game character art portrait of ${character.race} ${character.characterClass}, ${character.name}, ${character.title}, vibrant colors, 3D animated movie render, heroic expression, centered portrait`;
    const fallbackUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?seed=${seed}&width=800&height=800&nologo=true`;

    const img = new Image();
    img.src = fallbackUrl;
    img.onload = () => {
      onUpdatePortrait(character.id, fallbackUrl);
      setIsGeneratingPortrait(false);
    };
    img.onerror = () => {
      onUpdatePortrait(character.id, fallbackUrl);
      setIsGeneratingPortrait(false);
    };
  };

  const statItems = [
    { label: 'STR', value: character.stats.strength, key: 'strength' },
    { label: 'DEX', value: character.stats.dexterity, key: 'dexterity' },
    { label: 'CON', value: character.stats.constitution, key: 'constitution' },
    { label: 'INT', value: character.stats.intelligence, key: 'intelligence' },
    { label: 'WIS', value: character.stats.wisdom, key: 'wisdom' },
    { label: 'CHA', value: character.stats.charisma, key: 'charisma' },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={character.id}
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.97 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        id="character-card-container"
        className="w-full max-w-2xl mx-auto rounded-xl alchemist-parchment alchemist-border backdrop-blur-md overflow-hidden relative text-amber-100/90 shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
      >
        {/* Decorative corner accents */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-amber-500/80 pointer-events-none z-20" />
        <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-amber-500/80 pointer-events-none z-20" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-amber-500/80 pointer-events-none z-20" />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-amber-500/80 pointer-events-none z-20" />

        {/* Background glow behind header */}
        <div className={`absolute top-0 left-0 right-0 h-48 bg-gradient-to-b ${classInfo.bgGradient} opacity-30 pointer-events-none`} />

        {/* Top Player Card Foil Header Banner */}
        <div className="bg-stone-950/90 border-b border-amber-500/30 px-6 py-2.5 flex items-center justify-between text-[11px] font-sans uppercase tracking-[0.2em] text-amber-400/80">
          <div className="flex items-center gap-2">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-amber-300">Alchemist Player Card</span>
            <span className="text-amber-500/40">|</span>
            <span className="text-amber-200/60 font-mono">EDITION #{character.id.slice(-6).toUpperCase()}</span>
          </div>

          <button
            id="save-to-deck-btn"
            onClick={() => onToggleSaveDeck(character)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded transition-all cursor-pointer font-sans font-bold text-[10px] uppercase tracking-widest ${
              isInDeck
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-md shadow-amber-500/20'
            }`}
          >
            {isInDeck ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Saved In Deck</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5" />
                <span>Save To Deck</span>
              </>
            )}
          </button>
        </div>

        {/* Top Header Bar */}
        <div className="relative p-6 sm:p-8 border-b border-amber-500/20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Avatar Icon Circle */}
              <div
                id="character-avatar-icon"
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${character.avatarColor} p-0.5 shadow-xl flex items-center justify-center shrink-0 border border-amber-500/40`}
              >
                <div className="w-full h-full bg-stone-950/90 rounded-[10px] flex items-center justify-center text-amber-400">
                  <ClassIcon name={character.avatarIcon} className="w-8 h-8" />
                </div>
              </div>

              {/* Title & Name */}
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    id="character-class-badge"
                    className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded bg-amber-500/15 border border-amber-500/40 text-amber-400 text-xs font-sans uppercase tracking-widest font-semibold"
                  >
                    <ClassIcon name={classInfo.iconName} className="w-3.5 h-3.5" />
                    {character.characterClass}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider px-2.5 py-0.5 rounded bg-stone-900/80 text-amber-200/60 font-sans border border-amber-500/20">
                    Lvl {character.level} {character.race}
                  </span>
                </div>

                {/* Character Name in Stylized Medieval/Fantasy Font */}
                <h2 id="character-name" className="text-3xl sm:text-4xl font-bold tracking-wide text-amber-300 mt-1.5 font-medieval alchemist-gold-glow">
                  {character.name}
                </h2>
                <p id="character-title" className="text-xs sm:text-sm text-amber-400/80 font-uncial italic tracking-wider">
                  {character.title}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 self-end sm:self-center">
              <button
                id="copy-character-btn"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-widest font-semibold px-3 py-2 rounded bg-stone-900/80 hover:bg-stone-800 text-amber-200/70 hover:text-amber-100 transition-colors border border-amber-500/20 cursor-pointer"
                title="Copy character details"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Primary Card Power Stats (Health, Mana, Strength) */}
          <div className="grid grid-cols-3 gap-3 mt-6 p-3 rounded-lg bg-stone-950/90 border border-amber-500/25 shadow-inner">
            <div className="flex flex-col items-center justify-center p-2 rounded bg-red-950/30 border border-red-500/20">
              <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-red-400 font-sans">
                <Heart className="w-3.5 h-3.5 text-red-400 fill-red-500/20" /> Health
              </div>
              <span className="text-base font-extrabold text-red-300 font-mono mt-0.5">{character.stats.hp} HP</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 rounded bg-sky-950/30 border border-sky-500/20">
              <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-sky-400 font-sans">
                <Zap className="w-3.5 h-3.5 text-sky-400 fill-sky-400/20" /> Mana
              </div>
              <span className="text-base font-extrabold text-sky-300 font-mono mt-0.5">{character.stats.mana} MP</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 rounded bg-amber-950/30 border border-amber-500/20">
              <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-amber-400 font-sans">
                <Sword className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" /> Strength
              </div>
              <span className="text-base font-extrabold text-amber-300 font-mono mt-0.5">{character.stats.strength} STR</span>
            </div>
          </div>
        </div>

        {/* Card Body Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Character Portrait Banner Section */}
          <div className="relative rounded-lg overflow-hidden bg-black/40 border border-amber-500/30 p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-5 sm:gap-6 backdrop-blur-md">
            {/* Portrait Frame */}
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 shrink-0 rounded-lg overflow-hidden bg-slate-950 border border-white/10 shadow-2xl group">
              {/* Corner accents */}
              <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t border-l border-amber-500 z-10 pointer-events-none" />
              <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t border-r border-amber-500 z-10 pointer-events-none" />
              <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b border-l border-amber-500 z-10 pointer-events-none" />
              <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b border-r border-amber-500 z-10 pointer-events-none" />

              {isGeneratingPortrait ? (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-slate-950/90">
                  <Loader2 className="w-8 h-8 text-amber-500 animate-spin mb-2" />
                  <span className="text-[10px] uppercase tracking-widest text-amber-400 font-sans font-bold">
                    Conjuring Hero...
                  </span>
                  <span className="text-[9px] text-slate-500 font-sans mt-1">Video Game Style</span>
                </div>
              ) : character.portraitUrl ? (
                <div className="relative w-full h-full">
                  <img
                    src={character.portraitUrl}
                    alt={`${character.name} Cartoon Video Game Portrait`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2 pointer-events-none">
                    <span className="text-[9px] uppercase tracking-widest text-amber-300 font-sans font-bold">
                      Cartoon Video Game Style
                    </span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center bg-slate-950/80">
                  <ImageIcon className="w-8 h-8 text-amber-500/40 mb-2" />
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 font-sans font-semibold">
                    No Portrait Yet
                  </span>
                  <span className="text-[9px] text-slate-500 font-sans mt-1">Cartoon / Video Game Style</span>
                </div>
              )}
            </div>

            {/* Portrait Details & Action Buttons */}
            <div className="flex-1 space-y-3 text-center sm:text-left w-full">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] uppercase font-sans tracking-widest font-bold mb-1">
                  <Sparkles className="w-3 h-3 text-amber-500" /> Cartoon Portrait Feature
                </div>
                <h3 className="text-xl font-bold font-cinzel text-white">Visual Portrait</h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed mt-1">
                  Summon a custom cartoon & video game style portrait for <strong className="text-slate-200">{character.name}</strong>, capturing their {character.characterClass} armor and legendary persona.
                </p>
              </div>

              {/* Generate and Regenerate Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1 justify-center sm:justify-start">
                {!character.portraitUrl ? (
                  <button
                    id="generate-portrait-btn"
                    onClick={handleGeneratePortrait}
                    disabled={isGeneratingPortrait}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-amber-500 hover:bg-amber-400 text-black text-xs uppercase tracking-widest font-sans font-black transition-all shadow-lg shadow-amber-500/20 cursor-pointer disabled:opacity-50"
                  >
                    {isGeneratingPortrait ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Generate Portrait</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    id="regenerate-portrait-btn"
                    onClick={handleGeneratePortrait}
                    disabled={isGeneratingPortrait}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/40 text-xs uppercase tracking-widest font-sans font-black transition-all cursor-pointer disabled:opacity-50 hover:border-amber-400"
                  >
                    {isGeneratingPortrait ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Regenerating...</span>
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4" />
                        <span>Regenerate Portrait</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Attributes Grid */}
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-sans font-bold mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Attributes
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5 font-sans">
              {statItems.map((stat) => {
                const isPrimary = classInfo.primaryStat === stat.key;

                return (
                  <div
                    key={stat.label}
                    className={`p-3 rounded text-center border transition-all ${
                      isPrimary
                        ? 'bg-amber-500/10 border-amber-500/40'
                        : 'bg-white/5 border-white/5'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest block">
                      {stat.label}
                    </span>
                    <span className={`text-2xl font-bold block mt-0.5 ${isPrimary ? 'text-amber-400' : 'text-white'}`}>
                      {stat.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Alignment & Class Role */}
          <div className="p-3.5 rounded bg-white/5 border border-white/5 flex items-center justify-between text-xs font-sans">
            <span className="text-slate-400 uppercase tracking-widest text-[10px] font-semibold flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-amber-500" /> Alignment
            </span>
            <span className="font-semibold text-amber-500 uppercase tracking-wider bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/20">
              {character.alignment}
            </span>
          </div>

          {/* Class Abilities */}
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-sans font-bold mb-3 flex items-center gap-1.5">
              <Sword className="w-3.5 h-3.5 text-amber-500" /> Abilities & Spells
            </h3>
            <div className="space-y-2.5">
              {character.abilities.map((ability) => (
                <div
                  key={ability.name}
                  className="p-3.5 rounded bg-white/5 border border-white/5 hover:border-amber-500/30 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-white font-cinzel">{ability.name}</span>
                      <span
                        className={`text-[9px] uppercase tracking-widest font-bold px-2 py-0.5 rounded ${
                          ability.type === 'Ultimate'
                            ? 'bg-purple-950/80 text-purple-300 border border-purple-800/40'
                            : ability.type === 'Active'
                            ? 'bg-blue-950/80 text-blue-300 border border-blue-800/40'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {ability.type}
                      </span>
                    </div>
                    {ability.cost && (
                      <span className="text-xs text-slate-400 font-mono">{ability.cost}</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">{ability.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment Gear */}
          <div>
            <h3 className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-sans font-bold mb-2.5 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-amber-500" /> Starting Gear
            </h3>
            <div className="flex flex-wrap gap-2">
              {character.equipment.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-xs bg-white/5 text-slate-300 border border-white/5 font-sans"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Lore / Backstory & Quote */}
          <div className="pt-4 border-t border-amber-500/20 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-[10px] uppercase tracking-[0.2em] text-amber-400/80 font-sans font-bold flex items-center gap-1.5">
                <Scroll className="w-3.5 h-3.5 text-amber-400" /> Origin Lore
              </h3>
              <button
                id="generate-backstory-btn"
                onClick={handleGenerateBackstory}
                disabled={isGeneratingBackstory}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-[10px] uppercase tracking-widest font-sans font-bold transition-all cursor-pointer disabled:opacity-50 hover:border-amber-400 shadow-sm"
              >
                {isGeneratingBackstory ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                    <span>Weaving Lore...</span>
                  </>
                ) : character.backstory ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                    <span>Regenerate Backstory</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Generate Backstory</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative p-4 rounded-lg bg-stone-950/80 border border-amber-500/20 shadow-inner">
              <p className="text-sm text-amber-100/90 leading-relaxed italic font-serif">
                "{character.backstory || 'No lore recorded yet in the alchemist parchment.'}"
              </p>
              <p className="text-xs text-amber-400/80 text-right mt-2 font-serif italic">
                — {character.quote}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
