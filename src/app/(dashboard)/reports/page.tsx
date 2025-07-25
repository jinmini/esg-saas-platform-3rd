// src/app/(dashboard)/reports/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/shared/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs";
import { Badge } from "@/shared/ui/Badge";
import { Progress } from "@/shared/ui/Progress";
import { 
  FileText, 
  Download, 
  Eye, 
  Edit3, 
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Search
} from "lucide-react";
import { Input } from "@/shared/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/Table";

// 임시 타입 정의 (추후 별도 파일로 분리)
interface Report {
  id: string;
  title: string;
  type: 'SASB' | 'GRI' | 'TCFD' | 'Custom';
  status: 'draft' | 'in-progress' | 'review' | 'completed';
  progress: number;
  createdAt: string;
  updatedAt: string;
  author: string;
  reviewers: string[];
  company: string;
  period: string;
}

// 임시 데이터 (추후 API 연동)
const mockReports: Report[] = [
  {
    id: '1',
    title: '2024년 지속가능경영 보고서',
    type: 'GRI',
    status: 'in-progress',
    progress: 65,
    createdAt: '2024-03-15',
    updatedAt: '2024-03-20',
    author: '김영희',
    reviewers: ['박철수', '이지은'],
    company: '한국중부발전',
    period: '2024 Q1'
  },
  {
    id: '2',
    title: 'SASB 연료전지 지속가능성 보고서',
    type: 'SASB',
    status: 'completed',
    progress: 100,
    createdAt: '2024-03-01',
    updatedAt: '2024-03-18',
    author: '박철수',
    reviewers: ['김영희'],
    company: '두산퓨얼셀',
    period: '2023 Annual'
  },
  {
    id: '3',
    title: 'TCFD 기후 시나리오 분석',
    type: 'TCFD',
    status: 'review',
    progress: 85,
    createdAt: '2024-03-10',
    updatedAt: '2024-03-19',
    author: '이지은',
    reviewers: ['박철수', '김영희'],
    company: 'LS일렉트릭',
    period: '2024 Q1'
  },
  {
    id: '4',
    title: '공급망 ESG 실사 보고서',
    type: 'Custom',
    status: 'draft',
    progress: 20,
    createdAt: '2024-03-18',
    updatedAt: '2024-03-20',
    author: '김영희',
    reviewers: [],
    company: '한국중부발전',
    period: '2024 Q1'
  }
];

const statusConfig = {
  draft: { label: '초안', color: 'secondary', icon: Edit3 },
  'in-progress': { label: '작성중', color: 'default', icon: Clock },
  review: { label: '검토중', color: 'warning', icon: AlertCircle },
  completed: { label: '완료', color: 'success', icon: CheckCircle2 }
} as const;

const typeConfig = {
  SASB: { color: 'bg-blue-100 text-blue-800' },
  GRI: { color: 'bg-green-100 text-green-800' },
  TCFD: { color: 'bg-purple-100 text-purple-800' },
  Custom: { color: 'bg-gray-100 text-gray-800' }
} as const;

export default function ReportsPage() {
  const router = useRouter();
  
  return (
    <div className="space-y-6">
      {/* 헤더 섹션 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">ESG 보고서 관리</h1>
          <p className="text-muted-foreground mt-1">
            ESG 보고서를 작성, 검토 및 관리합니다
          </p>
        </div>
        <Button size="lg" className="gap-2" onClick={() => router.push('/reports/builder')}>
          <Plus className="h-5 w-5" />
          새 보고서 작성
        </Button>
      </div>

      {/* 통계 카드 */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">전체 보고서</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              전월 대비 +12%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">작성 중</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              평균 진행률 45%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">검토 대기</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              긴급 검토 1건
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">완료</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">13</div>
            <p className="text-xs text-muted-foreground">
              이번 분기 5건
            </p>
          </CardContent>
        </Card>
      </div>

      {/* 메인 콘텐츠 */}
      <Tabs defaultValue="all" className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">전체 보고서</TabsTrigger>
            <TabsTrigger value="my">내 보고서</TabsTrigger>
            <TabsTrigger value="review">검토 필요</TabsTrigger>
            <TabsTrigger value="templates">템플릿</TabsTrigger>
          </TabsList>
          
          {/* 필터 및 검색 */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="보고서 검색..."
                className="pl-8 w-[250px]"
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="보고서 유형" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 유형</SelectItem>
                <SelectItem value="sasb">SASB</SelectItem>
                <SelectItem value="gri">GRI</SelectItem>
                <SelectItem value="tcfd">TCFD</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all">
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="상태" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 상태</SelectItem>
                <SelectItem value="draft">초안</SelectItem>
                <SelectItem value="in-progress">작성중</SelectItem>
                <SelectItem value="review">검토중</SelectItem>
                <SelectItem value="completed">완료</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>보고서 목록</CardTitle>
              <CardDescription>
                모든 ESG 보고서를 확인하고 관리할 수 있습니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>보고서명</TableHead>
                    <TableHead>유형</TableHead>
                    <TableHead>기업</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>진행률</TableHead>
                    <TableHead>작성자</TableHead>
                    <TableHead>최종 수정</TableHead>
                    <TableHead className="text-right">작업</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockReports.map((report) => {
                    const StatusIcon = statusConfig[report.status].icon;
                    return (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            {report.title}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="secondary" 
                            className={typeConfig[report.type].color}
                          >
                            {report.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{report.company}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            <StatusIcon className="h-4 w-4" />
                            <span className="text-sm">
                              {statusConfig[report.status].label}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 w-[120px]">
                            <Progress value={report.progress} className="h-2" />
                            <span className="text-xs text-muted-foreground">
                              {report.progress}%
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <span className="text-sm">{report.author}</span>
                            {report.reviewers.length > 0 && (
                              <Badge variant="outline" className="text-xs">
                                +{report.reviewers.length}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            {new Date(report.updatedAt).toLocaleDateString('ko-KR')}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>내 보고서</CardTitle>
              <CardDescription>
                내가 작성하거나 검토 중인 보고서입니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                작성 중인 보고서가 표시됩니다
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="review" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>검토 대기 중</CardTitle>
              <CardDescription>
                검토가 필요한 보고서 목록입니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                검토 대기 중인 보고서가 표시됩니다
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className={typeConfig.SASB.color}>SASB</Badge>
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardTitle className="mt-4">SASB Standards</CardTitle>
                <CardDescription>
                  산업별 중요 지속가능성 정보 공시를 위한 표준 템플릿
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">템플릿 사용</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className={typeConfig.GRI.color}>GRI</Badge>
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardTitle className="mt-4">GRI Standards</CardTitle>
                <CardDescription>
                  글로벌 지속가능성 보고 표준에 따른 종합 보고서 템플릿
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">템플릿 사용</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className={typeConfig.TCFD.color}>TCFD</Badge>
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardTitle className="mt-4">TCFD Framework</CardTitle>
                <CardDescription>
                  기후 관련 재무정보 공개를 위한 권고안 기반 템플릿
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">템플릿 사용</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}