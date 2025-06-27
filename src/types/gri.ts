export type FieldType = 'short_text' | 'quantitative' | 'medium_text' | 'long_text' | 'date' | 'file_upload' | 'select';

export interface GriRequirement {
  id: string;
  title: string;
  description: string;
  requirement: string;
  type: FieldType;
  sample: string;
  options?: string[]; // For select type fields
  unit?: string; // For quantitative fields
}

export interface GriField {
  title: string;
  description: string;
  requirements: Record<string, GriRequirement>;
  sample: string;
}

export type GriData = Record<string, Record<string, GriField>>;

// 첨부파일 인터페이스
export interface Attachment {
  name: string;
  size: number;
  type: string;
  url?: string;
}

// GRI 응답 인터페이스
export interface GRIResponse {
  content: string;
  attachments: Attachment[];
}

export interface GRIEntry {
  standard: {
    code: string;
    title: string;
  };
  content: string;
}

export interface MockDisclosure {
  title: string;
  // ... existing code ...
}
