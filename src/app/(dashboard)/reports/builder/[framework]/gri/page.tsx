// src/app/(dashboard)/reports/builder/gri/page.tsx
"use client";

export const dynamic = 'force-dynamic';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ChevronRight, 
  Users, 
  MessageSquare,
  Save,
  Eye,
  HelpCircle,
  CheckCircle2,
  Circle,
  ArrowLeft
} from "lucide-react";
import { GRICascadeSelector } from "@/components/reports/builder/gri/cascade-selector";
import { GRIDynamicForm } from "@/components/reports/builder/gri/dynamic-form";
import { GRIProgressTracker } from "@/components/reports/builder/gri/progress-tracker";
import { DataIntegration } from "@/components/reports/builder/gri/data-integration";

// GRI Standards 구조
const GRI_STANDARDS = {
  universal: {
    id: "universal",
    name: "Universal Standards",
    description: "모든 조직에 적용되는 기본 표준",
    standards: [
      {
        id: "GRI-1",
        name: "Foundation 2021",
        description: "GRI 표준 사용을 위한 기본 원칙",
        disclosures: []
      },
      {
        id: "GRI-2",
        name: "General Disclosures 2021",
        description: "조직의 일반적인 정보 공시",
        disclosures: [
          { id: "2-1", name: "조직 세부 정보", mandatory: true },
          { id: "2-2", name: "조직의 지속가능성 보고 대상 법인", mandatory: true },
          { id: "2-3", name: "보고 기간, 빈도 및 연락처", mandatory: true },
          { id: "2-4", name: "정보의 재작성", mandatory: false },
          { id: "2-5", name: "외부 검증", mandatory: false }
        ]
      },
      {
        id: "GRI-3",
        name: "Material Topics 2021",
        description: "중요 주제 결정 및 관리",
        disclosures: [
          { id: "3-1", name: "중요 주제 결정 프로세스", mandatory: true },
          { id: "3-2", name: "중요 주제 목록", mandatory: true },
          { id: "3-3", name: "중요 주제 관리", mandatory: true }
        ]
      }
    ]
  },
  economic: {
    id: "economic",
    name: "Economic Standards",
    description: "경제적 영향 관련 표준",
    standards: [
      {
        id: "GRI-201",
        name: "Economic Performance",
        description: "경제적 성과",
        disclosures: [
          { id: "201-1", name: "직접적인 경제적 가치의 창출과 배분", mandatory: false },
          { id: "201-2", name: "기후변화의 재무적 영향과 사업활동에 대한 위험과 기회", mandatory: false }
        ]
      }
    ]
  },
  environmental: {
    id: "environmental",
    name: "Environmental Standards",
    description: "환경 영향 관련 표준",
    standards: [
      {
        id: "GRI-302",
        name: "Energy",
        description: "에너지 사용 및 관리",
        disclosures: [
          { id: "302-1", name: "조직 내부 에너지 소비", mandatory: false },
          { id: "302-2", name: "조직 외부 에너지 소비", mandatory: false },
          { id: "302-3", name: "에너지 집약도", mandatory: false }
        ]
      },
      {
        id: "GRI-305",
        name: "Emissions",
        description: "온실가스 배출",
        disclosures: [
          { id: "305-1", name: "직접 온실가스 배출량(Scope 1)", mandatory: false },
          { id: "305-2", name: "간접 온실가스 배출량(Scope 2)", mandatory: false },
          { id: "305-3", name: "기타 간접 온실가스 배출량(Scope 3)", mandatory: false }
        ]
      }
    ]
  },
  social: {
    id: "social",
    name: "Social Standards",
    description: "사회적 영향 관련 표준",
    standards: [
      {
        id: "GRI-401",
        name: "Employment",
        description: "고용",
        disclosures: [
          { id: "401-1", name: "신규채용과 이직", mandatory: false },
          { id: "401-2", name: "비정규 직원 혹은 파트타임 직원에게는 제공되지 않는 정규직원 대상의 보상", mandatory: false }
        ]
      }
    ]
  }
};

export default function GRIBuilderPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStandard, setSelectedStandard] = useState<string | null>(null);
  const [selectedDisclosure, setSelectedDisclosure] = useState<string | null>(null);
  const [overallProgress, setOverallProgress] = useState(15); // 기존 데이터 연동으로 15% 시작
  const [responses, setResponses] = useState<Record<string, string>>({});

  const steps = [
    { id: 1, name: "표준 선택", description: "GRI Standards 선택" },
    { id: 2, name: "공시사항 선택", description: "세부 공시사항 선택" },
    { id: 3, name: "데이터 입력", description: "요구사항 작성" },
    { id: 4, name: "검토 및 완성", description: "최종 검토" }
  ];

  const handleResponseChange = (disclosureId: string, value: string) => {
    setResponses((prev: Record<string, string>) => ({ ...prev, [disclosureId]: value }));
    // You might want to update overallProgress here based on the new response
  };

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/reports")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                보고서 목록
              </Button>
              <div className="h-4 w-px bg-border" />
              <h1 className="text-xl font-semibold">GRI Standards 보고서 작성</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Save className="h-4 w-4 mr-2" />
                임시 저장
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-2" />
                미리보기
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="h-4 w-4 mr-2" />
                도움말
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 진행률 바 */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">전체 진행률</span>
            <span className="text-sm text-muted-foreground">{overallProgress}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            기존 ESG 리스크 데이터를 활용하여 15%가 자동으로 채워졌습니다
          </p>
        </div>
      </div>

      {/* 단계 표시 */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center ${
                  index < steps.length - 1 ? "flex-1" : ""
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`rounded-full p-2 ${
                      step.id === currentStep
                        ? "bg-primary text-primary-foreground"
                        : step.id < currentStep
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step.id < currentStep ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <Circle className="h-4 w-4" />
                    )}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">{step.name}</p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="mx-4 h-4 w-4 text-muted-foreground" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* 좌측 네비게이션 */}
          <div className="col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">GRI Standards 구조</CardTitle>
                <CardDescription>
                  선택한 표준과 공시사항을 확인하세요
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[600px]">
                  <GRIProgressTracker
                    standards={GRI_STANDARDS}
                    selectedCategory={selectedCategory}
                    selectedStandard={selectedStandard}
                    selectedDisclosure={selectedDisclosure}
                    responses={responses}
                  />
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* 중앙 작업 영역 */}
          <div className="col-span-6">
            <Card>
              <CardContent className="p-6">
                {currentStep === 1 && (
                  <GRICascadeSelector
                    standards={GRI_STANDARDS}
                    onCategorySelect={setSelectedCategory}
                    onStandardSelect={setSelectedStandard}
                    onNext={() => setCurrentStep(2)}
                  />
                )}
                
                {currentStep === 2 && selectedStandard && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">공시사항 선택</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        보고할 세부 공시사항을 선택하세요
                      </p>
                    </div>
                    {/* 공시사항 선택 UI */}
                    <Button
                      onClick={() => {
                        // For now, let's hardcode the selection to proceed
                        setSelectedDisclosure("2-1");
                        setCurrentStep(3);
                      }}
                      className="w-full"
                    >
                      다음 단계로
                    </Button>
                  </div>
                )}
                
                {currentStep === 3 && selectedDisclosure && (
                  <>
                    {/* 기존 데이터 연동 알림 */}
                    <DataIntegration
                      disclosure={selectedDisclosure}
                      onDataMapped={(progress: number) => setOverallProgress((prev: number) => prev + progress)}
                    />

                    {/* 동적 입력 폼 */}
                    <GRIDynamicForm
                      category={selectedCategory || ''}
                      standardId={selectedStandard || ''}
                      onResponseChange={handleResponseChange}
                      initialResponses={responses}
                    />
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 우측 도움말/협업 */}
          <div className="col-span-3">
            <Tabs defaultValue="help" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="help">도움말</TabsTrigger>
                <TabsTrigger value="comments">댓글</TabsTrigger>
                <TabsTrigger value="team">팀</TabsTrigger>
              </TabsList>
              
              <TabsContent value="help" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <HelpCircle className="h-4 w-4" />
                      작성 가이드
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-sm font-medium text-blue-900 mb-1">
                          💡 자동 데이터 연동
                        </p>
                        <p className="text-xs text-blue-700">
                          기존 ESG 리스크 분석 데이터가 자동으로 연동됩니다. 
                          온실가스 배출, 에너지 사용량 등의 데이터가 이미 채워져 있을 수 있습니다.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">현재 작성 중인 공시사항</h4>
                        <p className="text-xs text-muted-foreground">
                          {selectedDisclosure || "공시사항을 선택하세요"}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">작성 팁</h4>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          <li>• 정량적 데이터는 가능한 정확히 입력하세요</li>
                          <li>• 증빙 자료를 함께 업로드하면 검증이 쉬워집니다</li>
                          <li>• 불확실한 부분은 댓글로 팀원과 논의하세요</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="comments" className="mt-4">
                <Card>
                  <CardContent className="py-6">
                    <p className="text-sm text-muted-foreground text-center">
                      아직 댓글이 없습니다
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="team" className="mt-4">
                <Card>
                  <CardContent className="py-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">김민수</p>
                          <p className="text-xs text-muted-foreground">작성자</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}