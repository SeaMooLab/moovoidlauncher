export interface Realm {
  id: string;
  name: string;
  title: string;
  description: string;
  dangerLevel: 'Safe Haven' | 'Moderate' | 'Hazardous' | 'Void Lethal';
  lootTier: 'Tier I' | 'Tier II' | 'Tier III' | 'Cosmic Mythic';
  lore: string;
  coords: string;
  tag: string;
  features: string[];
}

export interface PlayerRank {
  id: string;
  name: string;
  title: string;
  badge: string;
  color: string;
  perks: string[];
  cosmetics: string[];
  popular?: boolean;
}

export interface LeaderboardPlayer {
  rank: number;
  name: string;
  skinId: string;
  tag: string;
  primaryStat: string;
  value: string;
  secondaryStat: string;
  secondaryVal: string;
  rankBadge: string;
}

export const SERVER_INFO = {
  name: 'MooVoidSMP',
  subtitle: 'The Bovine Singularity',
  tagline: 'Where Endless Cosmic Space Collides with Pure Bovine Chaos',
  version: '1.21.4 Paper & Fabric Compatible',
  javaIP: 'play.moovoidsmp.net',
  bedrockIP: 'bedrock.moovoidsmp.net',
  bedrockPort: 19132,
  discordUrl: 'https://discord.gg/moovoid',
  storeUrl: '#store',
  mapUrl: '#map',
  initialOnline: 247,
  maxPlayers: 500,
  season: 'Season IV',
  seasonName: 'The Bovine Singularity',
  tps: '20.0',
  uptime: '99.98%',
  daysActive: 114,
};

export const REALMS: Realm[] = [
  {
    id: 'celestial-barn',
    name: 'The Celestial Barn',
    title: 'The Infinite Sanctuary & Bazaar',
    description: 'A luminous megastructure tethered to three dormant pulsar stars. Safe hub for barter, player markets, and community dairy silos.',
    dangerLevel: 'Safe Haven',
    lootTier: 'Tier I',
    lore: 'Constructed from ancient warp-wood and condensed obsidian milk, the Barn has stood unbreached since Season I.',
    coords: 'X: 0 / Y: 120 / Z: 0 (Central Spawn)',
    tag: 'SPAWN ZONE',
    features: ['Non-PvP Safezone', 'Player Shops & Auction Holo-Board', 'Proximity Voice Lounge', 'Daily Milk Fountain Rewards'],
  },
  {
    id: 'singularity-pastures',
    name: 'Singularity Pastures',
    title: 'Unstable Voxel Plains',
    description: 'Vast floating landmasses with purple grass, anti-gravity waterfalls, and roaming void calves that drop singularity crystals.',
    dangerLevel: 'Moderate',
    lootTier: 'Tier II',
    lore: 'The grass here absorbs raw starlight, making crop growth 3x faster, but wandering void rifts can spawn without warning.',
    coords: 'X: ±2,000 to ±8,000',
    tag: 'SURVIVAL SMP',
    features: ['Custom Void Biomes', '300x300 Land Claims', 'Meteorite Mining Events', 'Zero Fall-Damage Geysers'],
  },
  {
    id: 'lactose-belt',
    name: 'Lactose Asteroid Belt',
    title: 'The Low-Gravity Elysium',
    description: 'A fractured ring system where gravity drops to 35%. Elytra glide speeds are boosted by 150% between asteroid bases.',
    dangerLevel: 'Hazardous',
    lootTier: 'Tier III',
    lore: 'Asteroids here are mined for Condensed Whey Core, the primary fuel for interdimensional beacon teleporters.',
    coords: 'X: ±10,000 / Y: 240+',
    tag: 'ELYTRA ZONE',
    features: ['Low Gravity Physics', 'Asteroid Claiming Rights', 'Cosmic Beacon Beams', 'PvP Allowed with Bounty System'],
  },
  {
    id: 'abyssal-udder',
    name: 'The Abyssal Udder',
    title: 'Void Core Leviathan Lair',
    description: 'A crushing gravitational anomaly at the bottom of the world where the Cosmic Bovine Overlord resides.',
    dangerLevel: 'Void Lethal',
    lootTier: 'Cosmic Mythic',
    lore: 'Only squads with enchanted Netherite and Void-Gilded armor survive more than five minutes past the event horizon.',
    coords: 'Y: -64 Abyss Dimension',
    tag: 'RAID BOSS',
    features: ['Weekly 20-Player World Boss', 'Unique Mythic Relic Drops', 'Hardcore Combat Mechanics', 'Leaderboard Trophies'],
  },
];

export const LEADERBOARD_CATEGORIES = [
  { id: 'milk', label: 'Milk Extracted' },
  { id: 'kills', label: 'Void PvP Kills' },
  { id: 'playtime', label: 'Hours Played' },
  { id: 'bosses', label: 'Boss Raids' },
];

export const LEADERBOARDS: Record<string, LeaderboardPlayer[]> = {
  milk: [
    { rank: 1, name: 'BovineEmperor', skinId: 'MHF_Cow', tag: '[COSMIC]', primaryStat: 'Buckets Extracted', value: '184,920', secondaryStat: 'Dairy Empire Rank', secondaryVal: 'Grand Patriarch', rankBadge: '👑 #1 Overlord' },
    { rank: 2, name: 'VoidWalker_X', skinId: 'Notch', tag: '[MYTHIC]', primaryStat: 'Buckets Extracted', value: '142,310', secondaryStat: 'Dairy Empire Rank', secondaryVal: 'High Pasture Lord', rankBadge: '⭐ #2 Master' },
    { rank: 3, name: 'StarHeifer', skinId: 'MHF_Herobrine', tag: '[ELITE]', primaryStat: 'Buckets Extracted', value: '98,750', secondaryStat: 'Dairy Empire Rank', secondaryVal: 'Astro-Herder', rankBadge: '🌟 #3 Archon' },
    { rank: 4, name: 'NebulaMoose', skinId: 'MHF_Villager', tag: '[VIP+]', primaryStat: 'Buckets Extracted', value: '76,430', secondaryStat: 'Dairy Empire Rank', secondaryVal: 'Void Rancher', rankBadge: '#4 Veteran' },
    { rank: 5, name: 'Kowboy99', skinId: 'MHF_Steve', tag: '[VIP]', primaryStat: 'Buckets Extracted', value: '54,210', secondaryStat: 'Dairy Empire Rank', secondaryVal: 'Calf Whisperer', rankBadge: '#5 Artisan' },
  ],
  kills: [
    { rank: 1, name: 'ShadowUdder', skinId: 'MHF_Enderman', tag: '[TITAN]', primaryStat: 'Void Kills', value: '3,842', secondaryStat: 'K/D Ratio', secondaryVal: '7.82', rankBadge: '👑 Void Reaper' },
    { rank: 2, name: 'AstralBlade', skinId: 'MHF_Alex', tag: '[MYTHIC]', primaryStat: 'Void Kills', value: '2,910', secondaryStat: 'K/D Ratio', secondaryVal: '5.40', rankBadge: '⭐ Blood Bovine' },
    { rank: 3, name: 'Singularity_Pro', skinId: 'MHF_Blaze', tag: '[ELITE]', primaryStat: 'Void Kills', value: '2,150', secondaryStat: 'K/D Ratio', secondaryVal: '4.21', rankBadge: '🌟 Duelist' },
    { rank: 4, name: 'CosmicSniper', skinId: 'MHF_Skeleton', tag: '[VIP+]', primaryStat: 'Void Kills', value: '1,894', secondaryStat: 'K/D Ratio', secondaryVal: '3.90', rankBadge: '#4 Marksman' },
    { rank: 5, name: 'ZeroGravBoi', skinId: 'MHF_Zombie', tag: '[VIP]', primaryStat: 'Void Kills', value: '1,420', secondaryStat: 'K/D Ratio', secondaryVal: '3.12', rankBadge: '#5 Brawler' },
  ],
  playtime: [
    { rank: 1, name: 'LactoseLegend', skinId: 'MHF_Cow', tag: '[ELDER]', primaryStat: 'Total Hours', value: '1,842 hrs', secondaryStat: 'First Joined', secondaryVal: 'Day 1 (Season I)', rankBadge: '👑 Ancient One' },
    { rank: 2, name: 'PixelFarmer', skinId: 'MHF_Villager', tag: '[VIP+]', primaryStat: 'Total Hours', value: '1,610 hrs', secondaryStat: 'First Joined', secondaryVal: 'Day 3', rankBadge: '⭐ Dedicated' },
    { rank: 3, name: 'EnderCow', skinId: 'MHF_Enderman', tag: '[ELITE]', primaryStat: 'Total Hours', value: '1,280 hrs', secondaryStat: 'First Joined', secondaryVal: 'Day 12', rankBadge: '🌟 Sleepless' },
    { rank: 4, name: 'MilkwayWanderer', skinId: 'MHF_Steve', tag: '[VIP]', primaryStat: 'Total Hours', value: '940 hrs', secondaryStat: 'First Joined', secondaryVal: 'Day 20', rankBadge: '#4 Traveler' },
    { rank: 5, name: 'CosmoCalf', skinId: 'MHF_Alex', tag: '[MEMBER]', primaryStat: 'Total Hours', value: '810 hrs', secondaryStat: 'First Joined', secondaryVal: 'Day 25', rankBadge: '#5 Hermit' },
  ],
  bosses: [
    { rank: 1, name: 'VoidSlayer99', skinId: 'MHF_Wither', tag: '[TITAN]', primaryStat: 'Bosses Slain', value: '142', secondaryStat: 'Mythic Drops', secondaryVal: '38', rankBadge: '👑 Leviathan Bane' },
    { rank: 2, name: 'GigaBovine', skinId: 'MHF_IronGolem', tag: '[MYTHIC]', primaryStat: 'Bosses Slain', value: '109', secondaryStat: 'Mythic Drops', secondaryVal: '29', rankBadge: '⭐ Raid Commander' },
    { rank: 3, name: 'NightCalf', skinId: 'MHF_Spider', tag: '[ELITE]', primaryStat: 'Bosses Slain', value: '84', secondaryStat: 'Mythic Drops', secondaryVal: '19', rankBadge: '🌟 Vanguard' },
    { rank: 4, name: 'AbyssBreaker', skinId: 'MHF_Blaze', tag: '[VIP+]', primaryStat: 'Bosses Slain', value: '62', secondaryStat: 'Mythic Drops', secondaryVal: '14', rankBadge: '#4 Striker' },
    { rank: 5, name: 'MilkChampion', skinId: 'MHF_Cow', tag: '[VIP]', primaryStat: 'Bosses Slain', value: '47', secondaryStat: 'Mythic Drops', secondaryVal: '9', rankBadge: '#5 Hunter' },
  ],
};

export const SERVER_RULES = [
  {
    num: '01',
    title: 'No Griefing Within Claimed Quadrants',
    description: 'Use the standard Golden Shovel claim tool (/claim). Any block modification or entity tampering inside active claims is strictly rolled back and punished.',
    category: 'Claims & Protection',
  },
  {
    num: '02',
    title: 'Honor the Bovine Sanctuary Zone',
    description: 'No PvP, lava casting, or weapon discharge inside The Celestial Barn (0,0). All combat is reserved for wilderness & asteroid belts.',
    category: 'Spawn Etiquette',
  },
  {
    num: '03',
    title: 'No Hacked Clients or Unapproved X-Ray',
    description: 'Permitted client mods: OptiFine, Sodium, Iris Shaders, Lunar Client, Badlion, Simple Voice Chat, MiniMap (no cave finder). Autoclickers & baritone strictly banned.',
    category: 'Fair Play',
  },
  {
    num: '04',
    title: 'Respect Proximity Voice Protocol',
    description: 'Simple Voice Chat operates on 24454 UDP. Do not mic-spam, blast loud sounds in public trading hubs, or broadcast harassment.',
    category: 'Voice Chat',
  },
];

export const RANKS: PlayerRank[] = [
  {
    id: 'star-calf',
    name: 'Star Calf',
    title: 'Entry Tier Pioneer',
    badge: '★ STAR',
    color: '#38bdf8',
    perks: ['2x Land Claim Limit (600x600)', 'Access to /hat and /glow', '3 SetHomes in the Void', 'Colored Chat Glow'],
    cosmetics: ['Starlight Trail Particles', 'Baby Void Cow Companion Pet'],
  },
  {
    id: 'abyssal-bovine',
    name: 'Abyssal Bovine',
    title: 'Season Favorite',
    badge: '✦ ABYSSAL',
    color: '#c084fc',
    popular: true,
    perks: ['5x Land Claim Limit (1,500x1,500)', 'Access to /fly in personal claims', '8 SetHomes across dimensions', 'Automatic Milk Siphon Hopper', 'Keep Inventory on Asteroids'],
    cosmetics: ['Ethereal Cow Horns Aura', 'Singularity Particle Wings', 'Custom [ABYSS] Nameplate'],
  },
  {
    id: 'cosmic-overlord',
    name: 'Cosmic Overlord',
    title: 'The Ultimate Singularity',
    badge: '👑 OVERLORD',
    color: '#f43f5e',
    perks: ['Unlimited Land Claims', 'World Boss Priority Queue', '15 SetHomes with Direct Warp', 'Private Celestial Island Realm', 'Custom In-Game Discord Role'],
    cosmetics: ['Galactic Void Cow Mount', 'Animated Rainbow Constellation Cloak', 'Custom /moo sound on join'],
  },
];

export const INITIAL_TRANSMISSIONS = [
  { time: '12:44:02', user: 'ServerSys', msg: 'Singularity anomaly localized at X: 4500, Z: -3200! Cosmic Milk Meteor falling!', type: 'event' },
  { time: '12:43:50', user: 'BovineEmperor', msg: 'Selling 64 stacks of Condensed Void Whey at /warp market stall #4', type: 'chat' },
  { time: '12:43:18', user: 'VoidSlayer99', msg: 'Just delivered final strike to Abyssal Leviathan! +1200 Void Shards', type: 'boss' },
  { time: '12:42:55', user: 'AstroCalf', msg: 'fell into the infinite cosmic milk abyss (Y: -128)', type: 'death' },
  { time: '12:42:01', user: 'LactoseLegend', msg: 'Voice chat active in Barn Tavern, come grab a celestial milkshake', type: 'chat' },
  { time: '12:41:22', user: 'ServerSys', msg: 'Player "CosmicMoose" connected via Lunar Client 1.21.4 (Java)', type: 'join' },
];
