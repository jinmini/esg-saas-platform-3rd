// Public API for ESG Report Assistant Feature

// Types
export type {
  ESGExample,
  ESGSuggestion,
  ValidationResult,
  LengthGuide,
  ESGCategory,
  GRIFieldType
} from './types';

// Service Interface (for testing and future implementations)
export type { IESGReportAssistantService } from './services/interface';

// Main Hook
export { useESGAssistant } from './hooks/use-esg-assistant';

// Service Factory (for advanced usage)
export { getESGReportAssistantService, ESGReportAssistantServiceFactory } from './services/factory';

// For backward compatibility (will be removed after migration)
export { MockESGReportAssistantService } from './services/mock-implementation';

// Utilities
export { identifyESGCategorySync } from './services/mock-implementation'; 