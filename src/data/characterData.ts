import { CharacterClass, CharacterRace, CharacterAbility } from '../types';

export interface ClassInfo {
  name: CharacterClass;
  iconName: string;
  themeColor: string;
  bgGradient: string;
  borderColor: string;
  accentColor: string;
  primaryStat: 'strength' | 'dexterity' | 'intelligence' | 'wisdom' | 'charisma';
  description: string;
  abilities: CharacterAbility[];
  equipmentPool: string[];
}

export const CLASS_DETAILS: Record<CharacterClass, ClassInfo> = {
  Warrior: {
    name: 'Warrior',
    iconName: 'Shield',
    themeColor: 'text-amber-500',
    bgGradient: 'from-amber-950/40 via-stone-900 to-amber-900/20',
    borderColor: 'border-amber-600/40',
    accentColor: 'bg-amber-500',
    primaryStat: 'strength',
    description: 'Masters of martial combat, wielding heavy weaponry and unyielding bravery.',
    abilities: [
      { name: 'Shield Bash', description: 'Stuns the target for 2 seconds using heavy armor.', type: 'Active', cost: '15 Stamina' },
      { name: 'Unbreakable Will', description: 'Temporarily reduces incoming damage by 50%.', type: 'Ultimate', cost: '40 Stamina' },
      { name: 'Battle Stance', description: 'Increases attack power by 15% in melee range.', type: 'Passive' },
    ],
    equipmentPool: ['Greatsword of Valor', 'Plate Mail Armor', 'Tower Shield', 'Iron Gauntlets', 'Warhammer', 'Steel Helm'],
  },
  Mage: {
    name: 'Mage',
    iconName: 'Wand2',
    themeColor: 'text-sky-400',
    bgGradient: 'from-sky-950/40 via-slate-900 to-indigo-900/20',
    borderColor: 'border-sky-500/40',
    accentColor: 'bg-sky-500',
    primaryStat: 'intelligence',
    description: 'Scholars of arcane energies who command frost, fire, and lightning spells.',
    abilities: [
      { name: 'Arcane Nova', description: 'Unleashes a shockwave of magic dealing AOE damage.', type: 'Active', cost: '30 Mana' },
      { name: 'Time Stop', description: 'Freezes time around enemies for 3 seconds.', type: 'Ultimate', cost: '80 Mana' },
      { name: 'Spell Affinity', description: 'Regenerates mana 20% faster while standing still.', type: 'Passive' },
    ],
    equipmentPool: ['Crystal Staff', 'Silk Spell Robe', 'Tome of Astral Runes', 'Amulet of Arcana', 'Enchanted Ring', 'Focus Orb'],
  },
  Rogue: {
    name: 'Rogue',
    iconName: 'Sword',
    themeColor: 'text-emerald-400',
    bgGradient: 'from-emerald-950/40 via-zinc-900 to-teal-900/20',
    borderColor: 'border-emerald-500/40',
    accentColor: 'bg-emerald-500',
    primaryStat: 'dexterity',
    description: 'Lethal tricksters who strike from shadow with precision and speed.',
    abilities: [
      { name: 'Shadowstep', description: 'Teleports behind an enemy and delivers a critical strike.', type: 'Active', cost: '20 Energy' },
      { name: 'Vanish', description: 'Disappears into thin air, dropping all enemy threat.', type: 'Ultimate', cost: '50 Energy' },
      { name: 'Poison Coating', description: 'Attacks have a 30% chance to inflict damage over time.', type: 'Passive' },
    ],
    equipmentPool: ['Twin Shadow Daggers', 'Leather Jerkin', 'Grappling Hook', 'Vial of Black Lotus Poison', 'Thieves Tools', 'Cloak of Mists'],
  },
  Paladin: {
    name: 'Paladin',
    iconName: 'Sun',
    themeColor: 'text-yellow-400',
    bgGradient: 'from-yellow-950/40 via-stone-900 to-amber-900/20',
    borderColor: 'border-yellow-500/40',
    accentColor: 'bg-yellow-500',
    primaryStat: 'strength',
    description: 'Holy champions bound by oath to vanquish dark forces and shield the innocent.',
    abilities: [
      { name: 'Divine Smite', description: 'Infuses a weapon attack with radiant holy light.', type: 'Active', cost: '25 Mana' },
      { name: 'Aura of Protection', description: 'Shields nearby allies with holy sanctuary.', type: 'Ultimate', cost: '60 Mana' },
      { name: 'Righteous Zeal', description: 'Gains attack speed whenever an ally takes damage.', type: 'Passive' },
    ],
    equipmentPool: ['Gleaming Claymore', 'Gilded Plate Armor', 'Holy Reliquary', 'Blessed Shield', 'Insignia of Dawn', 'War Horn'],
  },
  Ranger: {
    name: 'Ranger',
    iconName: 'Trees',
    themeColor: 'text-green-400',
    bgGradient: 'from-green-950/40 via-stone-900 to-emerald-900/20',
    borderColor: 'border-green-500/40',
    accentColor: 'bg-green-500',
    primaryStat: 'dexterity',
    description: 'Master marksmen and wilderness survivalists bonded with beasts of the wild.',
    abilities: [
      { name: 'Multi-Shot', description: 'Fires a volley of 5 arrows hitting multiple targets.', type: 'Active', cost: '20 Stamina' },
      { name: 'Call Companion', description: 'Summons a spectral wolf to fight alongside you.', type: 'Ultimate', cost: '50 Stamina' },
      { name: 'Eagle Eye', description: 'Increases critical hit chance by 15% at range.', type: 'Passive' },
    ],
    equipmentPool: ['Yew Longbow', 'Quiver of Falcon Arrows', 'Camouflage Cloak', 'Hunting Knife', 'Herbal Salve Pouch', 'Trapping Gear'],
  },
  Cleric: {
    name: 'Cleric',
    iconName: 'Sparkles',
    themeColor: 'text-cyan-300',
    bgGradient: 'from-cyan-950/40 via-slate-900 to-blue-900/20',
    borderColor: 'border-cyan-500/40',
    accentColor: 'bg-cyan-400',
    primaryStat: 'wisdom',
    description: 'Devout conduits of divine energy who heal wounds and command sacred light.',
    abilities: [
      { name: 'Radiant Wave', description: 'Heals all party members within 10 meters.', type: 'Active', cost: '35 Mana' },
      { name: 'Resurrection', description: 'Restores a fallen companion with full health.', type: 'Ultimate', cost: '90 Mana' },
      { name: 'Blessed Aura', description: 'Increases health recovery of nearby allies.', type: 'Passive' },
    ],
    equipmentPool: ['Sacred Mace', 'Silver Vestments', 'Holy Symbol of Light', 'Censer of Incense', 'Pendant of Grace', 'Prayer Scroll'],
  },
  Necromancer: {
    name: 'Necromancer',
    iconName: 'Skull',
    themeColor: 'text-purple-400',
    bgGradient: 'from-purple-950/40 via-zinc-900 to-fuchsia-900/20',
    borderColor: 'border-purple-500/40',
    accentColor: 'bg-purple-500',
    primaryStat: 'intelligence',
    description: 'Wielders of forbidden shadow arts who summon undead legions and drain souls.',
    abilities: [
      { name: 'Soul Siphon', description: 'Drains enemy health to restore your own life force.', type: 'Active', cost: '25 Mana' },
      { name: 'Army of the Damned', description: 'Raises 4 skeletal warriors from the earth.', type: 'Ultimate', cost: '75 Mana' },
      { name: 'Grave Affinity', description: 'Gains mana whenever a unit dies nearby.', type: 'Passive' },
    ],
    equipmentPool: ['Bone Harvester Scythe', 'Midnight Shroud', 'Grimoire of Shadows', 'Phylactery Crystal', 'Skeletal Ring', 'Soul Gem'],
  },
  Bard: {
    name: 'Bard',
    iconName: 'Music',
    themeColor: 'text-rose-400',
    bgGradient: 'from-rose-950/40 via-neutral-900 to-pink-900/20',
    borderColor: 'border-rose-500/40',
    accentColor: 'bg-rose-500',
    primaryStat: 'charisma',
    description: 'Charismatic performers whose music weaves inspiring magic and disorienting tunes.',
    abilities: [
      { name: 'Discordant Note', description: 'Emits a sonic blast that confuses and damages enemies.', type: 'Active', cost: '20 Mana' },
      { name: 'Symphony of Valor', description: 'Grants massive attack and speed boosts to all allies.', type: 'Ultimate', cost: '60 Mana' },
      { name: 'Silver Tongue', description: 'Increases merchant discounts and charisma skill checks.', type: 'Passive' },
    ],
    equipmentPool: ['Enchanted Lute', 'Feathered Tricorne', 'Rapier of Charm', 'Silken Cloak', 'Songbook of Antiquity', 'Jester Bell Charm'],
  },
  Druid: {
    name: 'Druid',
    iconName: 'Leaf',
    themeColor: 'text-teal-400',
    bgGradient: 'from-teal-950/40 via-stone-900 to-green-900/20',
    borderColor: 'border-teal-500/40',
    accentColor: 'bg-teal-500',
    primaryStat: 'wisdom',
    description: 'Guardians of nature who shape-shift into fierce beasts and control weather.',
    abilities: [
      { name: 'Entangling Roots', description: 'Sprouts vines that immobilize target enemies.', type: 'Active', cost: '30 Mana' },
      { name: 'Primal Form', description: 'Transforms into a Dire Bear with doubled health.', type: 'Ultimate', cost: '70 Mana' },
      { name: 'Nature\'s Grace', description: 'Gains health regeneration while in natural terrain.', type: 'Passive' },
    ],
    equipmentPool: ['Gnarled Oak Staff', 'Wildhide Armor', 'Totem of the Bear', 'Moonstone Pendant', 'Herb Pouch', 'Mist Talisman'],
  },
  Monk: {
    name: 'Monk',
    iconName: 'Zap',
    themeColor: 'text-orange-400',
    bgGradient: 'from-orange-950/40 via-stone-900 to-amber-900/20',
    borderColor: 'border-orange-500/40',
    accentColor: 'bg-orange-500',
    primaryStat: 'dexterity',
    description: 'Ascetic martial artists who harness inner Ki to deliver lightning-fast strikes.',
    abilities: [
      { name: 'Flurry of Blows', description: 'Delivers 4 rapid unarmed strikes in a split second.', type: 'Active', cost: '15 Ki' },
      { name: 'Dragon Palm', description: 'Unleashes a shockwave of inner spirit energy.', type: 'Ultimate', cost: '45 Ki' },
      { name: 'Unarmored Defense', description: 'Converts wisdom directly into bonus armor class.', type: 'Passive' },
    ],
    equipmentPool: ['Ironwood Quarterstaff', 'Prayer Beads', 'Simple Cloth Robes', 'Bracers of Precision', 'Ki Focus Ring', 'Sandal of the Wind'],
  },
  Sorcerer: {
    name: 'Sorcerer',
    iconName: 'Flame',
    themeColor: 'text-violet-400',
    bgGradient: 'from-violet-950/40 via-slate-900 to-purple-900/20',
    borderColor: 'border-violet-500/40',
    accentColor: 'bg-violet-500',
    primaryStat: 'charisma',
    description: 'Innate spellcasters whose wild magic flows naturally through blood and soul.',
    abilities: [
      { name: 'Chaos Bolt', description: 'Hurls an orb of random elemental energy (Fire/Ice/Lightning).', type: 'Active', cost: '25 Mana' },
      { name: 'Metamagic Surge', description: 'Allows casting 2 spells simultaneously without cooldown.', type: 'Ultimate', cost: '65 Mana' },
      { name: 'Wild Surge', description: 'Spells have a chance to trigger beneficial random magic.', type: 'Passive' },
    ],
    equipmentPool: ['Dragon-Bone Wand', 'Spellfire Circlet', 'Mantle of Chaos', 'Elemental Focus Crystal', 'Phoenix Feather Pendant'],
  },
  Warlock: {
    name: 'Warlock',
    iconName: 'Eye',
    themeColor: 'text-fuchsia-400',
    bgGradient: 'from-fuchsia-950/40 via-zinc-900 to-purple-900/20',
    borderColor: 'border-fuchsia-500/40',
    accentColor: 'bg-fuchsia-500',
    primaryStat: 'charisma',
    description: 'Pact-bound casters who strike bargains with eldritch patrons for dark power.',
    abilities: [
      { name: 'Eldritch Blast', description: 'Fires a beam of crackling force energy at a target.', type: 'Active', cost: '15 Mana' },
      { name: 'Hellish Rebuke', description: 'Surrounds the target in demonic flames that burn over time.', type: 'Ultimate', cost: '55 Mana' },
      { name: 'Pact Bond', description: 'Restores mana instantly upon slaying an adversary.', type: 'Passive' },
    ],
    equipmentPool: ['Pact Blade', 'Obsidian Amulet', 'Eldritch Grimoire', 'Robe of the Fiend', 'Fiendish Sigil Ring', 'Void Gem'],
  },
};

export const FIRST_NAMES = [
  'Aethelgard', 'Balthazar', 'Cassian', 'Darius', 'Eldrin', 'Faelan', 'Gideon', 'Helena',
  'Ignis', 'Jora', 'Kaelen', 'Lysandra', 'Morgath', 'Niamh', 'Orion', 'Pyra',
  'Quentin', 'Roderick', 'Sylvan', 'Thalia', 'Uthor', 'Valeria', 'Wren', 'Xanthos',
  'Yvaine', 'Zarek', 'Astraea', 'Bram', 'Corvus', 'Doran', 'Elowen', 'Fenris',
  'Gloom', 'Hesper', 'Isolde', 'Jarek', 'Kaelath', 'Lyra', 'Malakor', 'Nox',
  'Oberon', 'Persephone', 'Riven', 'Seraphina', 'Talon', 'Vane', 'Zephyr', 'Aurelia'
];

export const LAST_NAMES = [
  'Shadowend', 'Ironfist', 'Starweaver', 'Stormcaller', 'Bloodthorn', 'Frostfang',
  'Dawnseeker', 'Nightshade', 'Silverwood', 'Ashford', 'Thunderbrand', 'Moonwhisper',
  'Ravencrest', 'Dragonheart', 'Voidwalker', 'Sunfury', 'Wildblood', 'Gloomstride',
  'Braveheart', 'Fireweaver', 'Deepforge', 'Windrider', 'Winterborn', 'Lightbringer'
];

export const TITLES = [
  'the Undaunted', 'the Arcane Weaver', 'the Silent Blade', 'the Radiant Shield',
  'the Wild Hunter', 'the Voice of Light', 'the Soul Harvester', 'the Wandering Bard',
  'the Forest Sentinel', 'the Swift Cyclone', 'the Dragon Slayer', 'the Shadow Walker',
  'the Spellbreaker', 'the Void Whisperer', 'the Oathkeeper', 'the Phoenix Ascendant'
];

export const RACES: CharacterRace[] = [
  'Human', 'Elf', 'Dwarf', 'Halfling', 'Dragonborn', 'Tiefling', 'Gnome', 'Half-Orc'
];

export const ALIGNMENTS = [
  'Lawful Good', 'Neutral Good', 'Chaotic Good',
  'Lawful Neutral', 'True Neutral', 'Chaotic Neutral',
  'Lawful Evil', 'Neutral Evil', 'Chaotic Evil'
];

export const BACKSTORY_TEMPLATES = [
  'Orphaned during the Siege of Crimson Hold, {name} was raised by ancient elders who recognized extraordinary talent in {class} arts. Now journeying across foreign lands to seek legendary artifacts.',
  'Born under a rare celestial alignment, {name} discovered an innate connection to magic early in life. Abandoned royal heritage to protect the realm from emerging otherworldly threats.',
  'Once a famed mercenary captain in the northern valleys, {name} survived a dire betrayal that claimed the rest of the company. Now driven by honor and vengeance.',
  'Trained in secret monasteries high above the cloudline, {name} descended to the mortal realm to balance the cosmic forces and restore forgotten knowledge.',
  'Discovered an ancient tome in forgotten ruins beneath the city catacombs, unlocking hidden gifts that forever changed destiny as a formidable {class}.'
];

export const QUOTE_TEMPLATES = [
  '"The darkest shadows only highlight the brightest flame."',
  '"Victory favors those who adapt before the storm arrives."',
  '"My blade speaks a language every enemy understands."',
  '"Knowledge is the sharpest weapon in any realm."',
  '"Never mistake patience for weakness."'
];
