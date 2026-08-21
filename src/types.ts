export type CharacterClass =
  | 'Warrior'
  | 'Mage'
  | 'Rogue'
  | 'Paladin'
  | 'Ranger'
  | 'Cleric'
  | 'Necromancer'
  | 'Bard'
  | 'Druid'
  | 'Monk'
  | 'Sorcerer'
  | 'Warlock';

export type CharacterRace =
  | 'Human'
  | 'Elf'
  | 'Dwarf'
  | 'Halfling'
  | 'Dragonborn'
  | 'Tiefling'
  | 'Gnome'
  | 'Half-Orc';

export interface CharacterStats {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
  hp: number;
  mana: number;
}

export interface CharacterAbility {
  name: string;
  description: string;
  type: 'Passive' | 'Active' | 'Ultimate';
  cost?: string;
}

export interface Character {
  id: string;
  name: string;
  title: string;
  characterClass: CharacterClass;
  race: CharacterRace;
  alignment: string;
  level: number;
  avatarIcon: string;
  avatarColor: string;
  stats: CharacterStats;
  abilities: CharacterAbility[];
  equipment: string[];
  backstory: string;
  quote: string;
  portraitUrl?: string;
  createdAt: number;
}
