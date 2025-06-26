import { GriData, FieldType, GriRequirement } from '@/types/gri';

// This is a placeholder. In a real app, you'd fetch and parse the CSV.
const csvContent = `
GRI STANDARD,공시사항,요구사항id,요구사항,정성데이터,answer,sample
GRI 2: General Disclosures 2021,2-1 조직 세부 정보,gri2-1-a,a. 법적 명칭 보고해주세요.,법적 명칭: xx기업,"당사의 법적 명칭은 당사이며, 소유권 및 법인 구분상 시장형 공기업이자 주식회사입니다. 본사는 대한민국 충청남도 보령시에 위치하고 있으며, 주요 운영 국가는 대한민국입니다."
GRI 2: General Disclosures 2021,2-1 조직 세부 정보,gri2-1-b,b. 소유권 및 법인 구분 보고해주세요.,xx 주식회사,
GRI 3: Material Topics 2021,3-1 중요 주제 결정 과정,gri3-1-a,a. 중요 주제 결정 과정을 설명해주세요.,"중요성 평가 과정을 단계별로 상세히 설명해주세요","이중 중대성 평가를 통해..."
`;

const determineFieldType = (requirement: string): FieldType => {
    const keywords = {
        short_text: ["명칭", "위치", "국가", "날짜"],
        quantitative: ["총", "비율", "%", "수치", "금액", "TJ", "MWh"],
        long_text: ["설명", "과정", "방법", "전략", "정책"]
    };

    for (const [type, words] of Object.entries(keywords)) {
        if (words.some(word => requirement.includes(word))) {
            return type as FieldType;
        }
    }
    return 'medium_text';
};

interface ParsedResult {
    griData: GriData;
    standards: any; // Replace 'any' with a more specific type if available
}

const parseGriCsv = (csv: string): ParsedResult => {
    const griData: GriData = {};
    const standards: any = {}; // Replace 'any' with a more specific type
    const lines = csv.trim().split('\n');
    
    let currentStandard = '';
    let currentDisclosure = '';

    for (const line of lines) {
        if (line.startsWith('GRI STANDARD') || !line.trim()) {
            continue;
        }

        const columns = line.split(',').map(col => (col || '').trim().replace(/^"(.*)"$/, '$1'));

        const standardName = (columns[0] || '').trim() || currentStandard;
        const disclosureName = (columns[1] || '').trim() || currentDisclosure;
        const reqId = (columns[2] || '').trim();
        const requirementText = (columns[3] || '').trim();
        const sample = columns[6] ? (columns[6] || '').trim().replace(/"/g, '') : '';

        if (standardName && standardName !== currentStandard) {
            currentStandard = standardName;
            if (!griData[currentStandard]) {
                griData[currentStandard] = {};
                // This is a simplified structure for standards, you might need to adjust
                standards[currentStandard] = { id: currentStandard, name: currentStandard, standards: [] };
            }
        }
        
        if (disclosureName && disclosureName !== currentDisclosure) {
            currentDisclosure = disclosureName;
            if (!griData[currentStandard][currentDisclosure]) {
                griData[currentStandard][currentDisclosure] = { requirements: {}, sample: '' };
                // This is a simplified structure for standards, you might need to adjust
                standards[currentStandard].standards.push({ id: currentDisclosure, name: disclosureName, disclosures: [] });
            }
        }

        if (reqId && requirementText) {
            const fieldType = determineFieldType(requirementText);
            const requirement: GriRequirement = {
                id: reqId,
                requirement: requirementText,
                type: fieldType,
                sample: sample || "샘플 답변이 없습니다."
            };

            if (griData[currentStandard] && griData[currentStandard][currentDisclosure]) {
                griData[currentStandard][currentDisclosure].requirements[reqId] = requirement;
                
                const standardRef = standards[currentStandard].standards.find((s:any) => s.id === currentDisclosure);
                if(standardRef) {
                    standardRef.disclosures.push({ id: reqId, name: requirementText, mandatory: true }); // Assuming all are mandatory for now
                }
            }
        }
    }
    return { griData, standards };
};

const parsedData = parseGriCsv(csvContent);

export const griData = parsedData.griData;
export const standards = parsedData.standards;

console.log("Parsed GRI Data:", JSON.stringify(griData, null, 2));
