import { GRIFieldType, ESGCategory } from "@/features/esg-report-assistant";

// from ReportPreview/index.tsx
export const getESGBadgeStyle = (category: 'E' | 'S' | 'G' | 'unknown') => {
    switch (category) {
      case 'E': return { className: 'bg-green-100 text-green-800 border-green-200', icon: '🌱', label: '환경' };
      case 'S': return { className: 'bg-blue-100 text-blue-800 border-blue-200', icon: '👥', label: '사회' };
      case 'G': return { className: 'bg-purple-100 text-purple-800 border-purple-200', icon: '⚖️', label: '지배구조' };
      default: return { className: 'bg-gray-100 text-gray-800 border-gray-200', icon: '📄', label: '기타' };
    }
};

// from SmartTextarea/index.tsx
export const getFieldConfig = (type: GRIFieldType) => {
    // Based on SMART_FIELD_CONFIG from gri3.md
    const defaultConfig = {
      initialRows: 3,
      maxRows: 10,
      placeholder: "내용을 입력해주세요...",
      tools: [] as string[],
    };
  
    switch (type) {
      case 'short_text':
        return { ...defaultConfig, initialRows: 1, maxRows: 3, placeholder: "간단히 입력해주세요 (예: 회사명, 주소 등)" };
      case 'quantitative':
        return { ...defaultConfig, initialRows: 2, tools: ["calculator", "unit_converter"], placeholder: "숫자 데이터와 설명을 함께 입력해주세요\n예: 총 425,000 TJ (유연탄 350,000 TJ, LNG 75,000 TJ)" };
      case 'medium_text':
        return { ...defaultConfig, initialRows: 4, maxRows: 8, placeholder: "구체적인 설명을 입력해주세요..." };
      case 'long_text':
        return { ...defaultConfig, initialRows: 6, maxRows: 15, tools: ["formatting", "bullet_points", "templates"], placeholder: "상세한 설명을 입력해주세요. 필요시 구조화된 형태로 작성하세요..." };
      default:
        return defaultConfig;
    }
};
  
export const getCategoryColor = (category: ESGCategory) => {
    switch (category) {
      case 'E': return 'bg-green-100 text-green-800';
      case 'S': return 'bg-blue-100 text-blue-800';
      case 'G': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
}; 