import { INTEGRATED_SECTIONS } from '@/entities/report/constants/integrated';

/**
 * 통합 보고서 진행률(%) 계산
 * @param responses - { [subsectionId]: string }
 * @param sections - INTEGRATED_SECTIONS (default: import)
 * @returns number (0~100)
 */
export function getIntegratedReportProgress(
  responses: Record<string, string>,
  sections = INTEGRATED_SECTIONS
): number {
  const totalSubsections = Object.values(sections).reduce(
    (acc, section) => acc + section.subsections.length, 0
  );
  if (totalSubsections === 0) return 0;
  const completed = Object.keys(responses).filter(
    key => responses[key]?.trim().length > 0
  ).length;
  return Math.round((completed / totalSubsections) * 100);
} 