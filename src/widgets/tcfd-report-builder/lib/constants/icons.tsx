import { Shield, Target, AlertTriangle, TrendingUp } from "lucide-react";
import { ReactNode } from "react";

export function getTcfdPillarIcon(pillar: string): ReactNode {
  switch (pillar) {
    case 'governance':
      return <Shield className="h-5 w-5" />;
    case 'strategy':
      return <Target className="h-5 w-5" />;
    case 'risk_management':
      return <AlertTriangle className="h-5 w-5" />;
    case 'metrics_targets':
      return <TrendingUp className="h-5 w-5" />;
    default:
      return null;
  }
} 