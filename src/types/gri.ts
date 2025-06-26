export type FieldType = 'short_text' | 'quantitative' | 'medium_text' | 'long_text';

export interface GriRequirement {
  id: string;
  requirement: string;
  type: FieldType;
  sample: string;
}

export interface GriField {
  requirements: Record<string, GriRequirement>;
  sample: string;
}

export type GriData = Record<string, Record<string, GriField>>;
