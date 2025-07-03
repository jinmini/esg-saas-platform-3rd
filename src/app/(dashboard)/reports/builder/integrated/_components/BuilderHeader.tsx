import React from 'react';
import { Button } from "@/shared/ui/Button";
import { Progress } from "@/shared/ui/Progress";
import { Badge } from "@/shared/ui/Badge";
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Download,
  Layers
} from "lucide-react";
import { useRouter } from 'next/navigation';

interface BuilderHeaderProps {
  progress: number;
  onSave: () => void;
  onPreview: () => void;
  onExport: () => void;
}

export function BuilderHeader({ progress, onSave, onPreview, onExport }: BuilderHeaderProps) {
  const router = useRouter();

  const getFrameworkBadges = (frameworks: string[]) => {
    const colors = {
      'GRI': 'bg-green-100 text-green-800',
      'SASB': 'bg-blue-100 text-blue-800',
      'TCFD': 'bg-purple-100 text-purple-800'
    };
    
    return frameworks.map(framework => (
      <Badge key={framework} variant="outline" className={colors[framework as keyof typeof colors]}>
        {framework}
      </Badge>
    ));
  };

  return (
    <header className="p-4 border-b bg-gradient-to-r from-orange-50 to-red-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push('/reports/builder')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            프레임워크 선택
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Layers className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold">통합 ESG 보고서</h1>
              <p className="text-sm text-muted-foreground">GRI + SASB + TCFD 통합 프레임워크</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onSave}>
            <Save className="h-4 w-4 mr-2" />
            저장
          </Button>
          <Button variant="outline" size="sm" onClick={onPreview}>
            <Eye className="h-4 w-4 mr-2" />
            미리보기
          </Button>
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="h-4 w-4 mr-2" />
            내보내기
          </Button>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">통합 보고서 완성도</span>
          <span className="text-sm text-muted-foreground">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
        <div className="flex gap-2 mt-2">
          {getFrameworkBadges(['GRI', 'SASB', 'TCFD'])}
          <span className="text-xs text-muted-foreground">3개 프레임워크 통합</span>
        </div>
      </div>
    </header>
  );
}