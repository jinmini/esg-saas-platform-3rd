export interface Recommendation {
  id: string;
  name: string;
  description: string;
  questions: string[];
}

export interface Pillar {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  recommendations: Recommendation[];
}

export interface Framework {
  governance: Pillar;
  strategy: Pillar;
  risk_management: Pillar;
  metrics_targets: Pillar;
}

export type Responses = Record<string, string>; 