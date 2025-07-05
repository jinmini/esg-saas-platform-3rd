export interface ESGExample {
  category: 'E' | 'S' | 'G';
  text: string;
  context: string;
  length: number;
}

export interface ESGSuggestion {
  text: string;
  confidence: number;
  source: 'template' | 'similar_context' | 'field_type';
}

export interface ValidationResult {
  isValid: boolean;
  suggestions: string[];
  score: number;
}

export interface LengthGuide {
  min: number;
  max: number;
  ideal: number;
  current: number;
  message: string;
  status: 'too_short' | 'too_long' | 'ideal' | 'acceptable';
}

export type ESGCategory = 'E' | 'S' | 'G' | 'unknown';
export type GRIFieldType = 'short_text' | 'medium_text' | 'long_text' | 'quantitative'; 