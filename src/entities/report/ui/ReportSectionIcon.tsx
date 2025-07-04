import React from 'react';
import { Building2, Leaf, Target, Globe, Users, Shield } from "lucide-react";

const icons: { [key: string]: React.ElementType } = {
  building2: Building2,
  leaf: Leaf,
  target: Target,
  globe: Globe,
  users: Users,
  shield: Shield,
};

export function ReportSectionIcon({ iconName, className }: { iconName: string; className?: string }) {
  const IconComponent = icons[iconName];
  
  if (!IconComponent) {
    return null;
  }
  
  return <IconComponent className={className || "h-5 w-5"} />;
} 