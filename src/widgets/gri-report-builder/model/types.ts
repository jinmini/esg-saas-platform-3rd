// Placeholder for types related to the GRI report builder 

export interface GRIIndicator {
  id: string;
  code: string;
  title: string;
  description: string;
  category: string;
  required: boolean;
}

export interface GRIReportData {
  companyInfo: {
    name: string;
    industry: string;
    reportingPeriod: string;
  };
  indicators: Record<string, any>;
  status: 'draft' | 'review' | 'published';
}

export interface GRIReportConfig {
  template: string;
  includedIndicators: string[];
  customFields: Record<string, any>;
} 