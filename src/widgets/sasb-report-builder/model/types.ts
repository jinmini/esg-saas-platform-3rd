import { SASB_INDUSTRIES } from "../lib/constants/industries";

// SASB_INDUSTRIES 상수로부터 타입 추론
type Industries = typeof SASB_INDUSTRIES;
type IndustryId = keyof Industries;
type IndustryData = Industries[IndustryId];
type SectorData = IndustryData['sectors'][number];

// 외부에 노출할 타입 정의
export type Metric = SectorData['metrics'][number];
export type Sector = SectorData;
export type Industry = IndustryData;
export type Framework = typeof SASB_INDUSTRIES;
export type Responses = Record<string, string>; 