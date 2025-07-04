import { TrendingUp, Users, Shield } from "lucide-react";
import { ReactNode } from "react";

export function getCategoryIcon(category: string): ReactNode {
  switch (category) {
    case 'environmental':
      return <TrendingUp className="h-4 w-4" />;
    case 'social':
      return <Users className="h-4 w-4" />;
    case 'governance':
      return <Shield className="h-4 w-4" />;
    default:
      return null;
  }
} 