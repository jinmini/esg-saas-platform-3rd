"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw,
  Database,
  Zap,
  TrendingUp,
  FileText,
  Clock
} from "lucide-react";

interface DataIntegrationProps {
  disclosure: string;
  onDataMapped: (progress: number) => void;
}

// 기존 ESG 데이터와 GRI 공시사항 매핑 정보
const DATA_MAPPINGS = {
  "305-1": {
    name: "직접 온실가스 배출량(Scope 1)",
    mappedData: [
      { source: "실시간 환경 모니터링", value: "45,230 tCO2e", confidence: 95 },
      { source: "에너지 사용량 분석", value: "12,850 tCO2e", confidence: 88 }
    ],
    autoFillable: true,
    estimatedTime: "2분"
  },
  "305-2": {
    name: "간접 온실가스 배출량(Scope 2)",
    mappedData: [
      { source: "전력 사용량 데이터", value: "23,450 tCO2e", confidence: 92 }
    ],
    autoFillable: true,
    estimatedTime: "1분"
  },
  "302-1": {
    name: "조직 내부 에너지 소비",
    mappedData: [
      { source: "시설 에너지 모니터링", value: "125,000 GJ", confidence: 90 },
      { source: "연료 사용량 기록", value: "85,000 GJ", confidence: 85 }
    ],
    autoFillable: true,
    estimatedTime: "3분"
  },
  "201-1": {
    name: "직접적인 경제적 가치의 창출과 배분",
    mappedData: [
      { source: "재무 성과 데이터", value: "분기별 수익 정보", confidence: 75 }
    ],
    autoFillable: false,
    estimatedTime: "15분"
  }
};

export function DataIntegration({ disclosure, onDataMapped }: DataIntegrationProps) {
  const [isMapping, setIsMapping] = useState(false);
  const [mappingProgress, setMappingProgress] = useState(0);
  const [mappedData, setMappedData] = useState<any[]>([]);
  const [autoFilled, setAutoFilled] = useState(false);

  const mappingInfo = DATA_MAPPINGS[disclosure as keyof typeof DATA_MAPPINGS];

  useEffect(() => {
    // 컴포넌트 마운트 시 자동으로 데이터 매핑 시작
    if (mappingInfo && !autoFilled) {
      startMapping();
    }
  }, [disclosure, mappingInfo, autoFilled]);

  const startMapping = async () => {
    if (!mappingInfo) return;

    setIsMapping(true);
    setMappingProgress(0);

    // 시뮬레이션된 데이터 매핑 프로세스
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 100));
      setMappingProgress(i);
    }

    setMappedData(mappingInfo.mappedData);
    setIsMapping(false);
    setAutoFilled(true);
    
    // 부모 컴포넌트에 진행률 전달
    if (mappingInfo.autoFillable) {
      onDataMapped(15); // 자동 입력 가능한 경우 15% 진행률 추가
    } else {
      onDataMapped(5); // 부분적 데이터만 있는 경우 5% 진행률 추가
    }
  };

  if (!mappingInfo) {
    return (
      <Card className="mb-6">
        <CardContent className="py-6">
          <div className="text-center text-muted-foreground">
            <Database className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">이 공시사항에 대한 기존 데이터가 없습니다.</p>
            <p className="text-xs mt-1">수동으로 입력해주세요.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6 border-blue-200 bg-blue-50/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <Zap className="h-5 w-5 text-blue-600" />
          스마트 데이터 연동
        </CardTitle>
        <CardDescription>
          {mappingInfo.name}에 대한 기존 데이터를 자동으로 찾고 있습니다
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 매핑 진행률 */}
        {isMapping && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                데이터 분석 중...
              </span>
              <span>{mappingProgress}%</span>
            </div>
            <Progress value={mappingProgress} className="h-2" />
          </div>
        )}

        {/* 매핑된 데이터 표시 */}
        {!isMapping && mappedData.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <span className="font-medium text-sm">발견된 관련 데이터</span>
              {mappingInfo.autoFillable && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  자동 입력 가능
                </Badge>
              )}
            </div>

            {mappedData.map((data, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded">
                    <TrendingUp className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{data.source}</p>
                    <p className="text-xs text-muted-foreground">{data.value}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">신뢰도</div>
                    <div className={`text-sm font-medium ${
                      data.confidence >= 90 ? 'text-green-600' : 
                      data.confidence >= 80 ? 'text-yellow-600' : 'text-orange-600'
                    }`}>
                      {data.confidence}%
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    data.confidence >= 90 ? 'bg-green-500' : 
                    data.confidence >= 80 ? 'bg-yellow-500' : 'bg-orange-500'
                  }`} />
                </div>
              </div>
            ))}

            {/* 자동 입력 정보 */}
            <div className="bg-white border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-1">
                    {mappingInfo.autoFillable ? '자동 입력 완료' : '부분적 데이터 확인'}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {mappingInfo.autoFillable 
                      ? '발견된 데이터가 자동으로 양식에 입력되었습니다. 검토 후 필요시 수정해주세요.'
                      : '관련 데이터를 참고하여 수동으로 입력해주세요.'
                    }
                  </p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      예상 작업 시간: {mappingInfo.estimatedTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <FileText className="h-3 w-3" />
                      {mappedData.length}개 데이터 소스
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 재매핑 버튼 */}
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setAutoFilled(false);
                  startMapping();
                }}
                disabled={isMapping}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isMapping ? 'animate-spin' : ''}`} />
                데이터 다시 찾기
              </Button>
            </div>
          </div>
        )}

        {/* 데이터가 없는 경우 */}
        {!isMapping && mappedData.length === 0 && (
          <div className="text-center py-6">
            <AlertCircle className="h-8 w-8 mx-auto mb-3 text-orange-500" />
            <p className="text-sm font-medium mb-1">관련 데이터를 찾을 수 없습니다</p>
            <p className="text-xs text-muted-foreground">
              수동으로 데이터를 입력하거나 데이터 소스를 확인해주세요
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 