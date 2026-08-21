import React from 'react';
import {
  Shield,
  Wand2,
  Sword,
  Sun,
  Trees,
  Sparkles,
  Skull,
  Music,
  Leaf,
  Zap,
  Flame,
  Eye,
  User,
} from 'lucide-react';

interface ClassIconProps {
  name: string;
  className?: string;
}

export const ClassIcon: React.FC<ClassIconProps> = ({ name, className = 'w-5 h-5' }) => {
  switch (name) {
    case 'Shield':
      return <Shield className={className} />;
    case 'Wand2':
      return <Wand2 className={className} />;
    case 'Sword':
      return <Sword className={className} />;
    case 'Sun':
      return <Sun className={className} />;
    case 'Trees':
      return <Trees className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'Skull':
      return <Skull className={className} />;
    case 'Music':
      return <Music className={className} />;
    case 'Leaf':
      return <Leaf className={className} />;
    case 'Zap':
      return <Zap className={className} />;
    case 'Flame':
      return <Flame className={className} />;
    case 'Eye':
      return <Eye className={className} />;
    default:
      return <User className={className} />;
  }
};
