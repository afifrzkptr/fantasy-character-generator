import { Character, CharacterClass, CharacterRace } from '../types';
import {
  CLASS_DETAILS,
  FIRST_NAMES,
  LAST_NAMES,
  TITLES,
  RACES,
  ALIGNMENTS,
  BACKSTORY_TEMPLATES,
  QUOTE_TEMPLATES,
} from '../data/characterData';

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomCharacter(preferredClass?: CharacterClass): Character {
  const firstName = getRandomElement(FIRST_NAMES);
  const lastName = getRandomElement(LAST_NAMES);
  const fullName = `${firstName} ${lastName}`;
  const title = getRandomElement(TITLES);

  const classes = Object.keys(CLASS_DETAILS) as CharacterClass[];
  const characterClass = preferredClass || getRandomElement(classes);
  const classInfo = CLASS_DETAILS[characterClass];
  const race: CharacterRace = getRandomElement(RACES);
  const alignment = getRandomElement(ALIGNMENTS);

  // Generate stats according to primary stat bias
  const primaryStat = classInfo.primaryStat;
  const stats = {
    strength: getRandomNumber(8, 16),
    dexterity: getRandomNumber(8, 16),
    constitution: getRandomNumber(8, 16),
    intelligence: getRandomNumber(8, 16),
    wisdom: getRandomNumber(8, 16),
    charisma: getRandomNumber(8, 16),
    hp: 0,
    mana: 0,
  };

  // Boost primary stat
  stats[primaryStat] = getRandomNumber(16, 20);

  // Calculate HP and Mana/Ki
  stats.hp = 80 + stats.constitution * 5 + getRandomNumber(10, 40);
  stats.mana = 50 + (stats.intelligence + stats.wisdom + stats.charisma) * 3 + getRandomNumber(10, 30);

  // Select 2-3 random equipment from pool
  const shuffledEquip = [...classInfo.equipmentPool].sort(() => 0.5 - Math.random());
  const equipment = shuffledEquip.slice(0, 3);

  // Format backstory template
  const rawBackstory = getRandomElement(BACKSTORY_TEMPLATES);
  const backstory = rawBackstory
    .replace('{name}', firstName)
    .replace('{class}', characterClass);

  const quote = getRandomElement(QUOTE_TEMPLATES);

  const colorVariants = [
    'from-amber-500 to-red-600',
    'from-sky-400 to-indigo-600',
    'from-emerald-400 to-teal-600',
    'from-purple-500 to-pink-600',
    'from-rose-500 to-amber-600',
    'from-cyan-400 to-blue-600',
  ];
  const avatarColor = getRandomElement(colorVariants);

  return {
    id: `char_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name: fullName,
    title,
    characterClass,
    race,
    alignment,
    level: getRandomNumber(1, 12),
    avatarIcon: classInfo.iconName,
    avatarColor,
    stats,
    abilities: classInfo.abilities,
    equipment,
    backstory,
    quote,
    createdAt: Date.now(),
  };
}
