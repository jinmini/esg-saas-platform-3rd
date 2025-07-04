import {
  Card,
  CardContent
} from "@/shared/ui/Card";
import { Badge } from "@/shared/ui/Badge";
import { CheckCircle2 } from 'lucide-react';
import { INTEGRATED_SECTIONS } from '@/entities/report/model/constants';
import { ReportSectionIcon } from '@/entities/report/ui/ReportSectionIcon';

interface BuilderSidebarProps {
  selectedSection: string;
  onSectionSelect: (sectionId: string, subsectionId: string) => void;
  responses: { [key: string]: string };
}

const getFrameworkBadges = (frameworks: string[]) => {
  return frameworks.map(f => {
    let color;
    switch (f) {
      case 'GRI': color = 'bg-blue-200 text-blue-800'; break;
      case 'SASB': color = 'bg-green-200 text-green-800'; break;
      case 'TCFD': color = 'bg-orange-200 text-orange-800'; break;
      default: color = 'bg-gray-200 text-gray-800'; break;
    }
    return <Badge key={f} className={`${color} text-xs`}>{f}</Badge>;
  });
};

export function BuilderSidebar({ selectedSection, onSectionSelect, responses }: BuilderSidebarProps) {
  const currentSection = INTEGRATED_SECTIONS[selectedSection as keyof typeof INTEGRATED_SECTIONS];

  return (
    <aside className="w-96 border-r bg-gray-50/50 p-6 flex flex-col">
      <div className="mb-6">
        <h2 className="text-xl font-bold">통합 ESG 보고서</h2>
        <p className="text-sm text-muted-foreground">
          {currentSection ? currentSection.name : "전체 섹션 개요"}
        </p>
      </div>

      <div className="overflow-y-auto -mr-6 pr-6">
        <div className="space-y-6">
          <div>
           <h3 className="font-semibold mb-3">통합 보고서 섹션</h3>
           <div className="space-y-3">
             {Object.values(INTEGRATED_SECTIONS).map((section) => (
               <Card 
                 key={section.id}
                 className={`cursor-pointer transition-all duration-200 ${
                   selectedSection === section.id 
                     ? 'ring-2 ring-blue-500 bg-blue-50' 
                     : 'hover:bg-gray-50'
                 }`}
                 onClick={() => onSectionSelect(section.id, section.subsections[0].id)}
               >
                 <CardContent className="p-4">
                   <div className="flex items-start gap-3">
                     <div className={`p-2 rounded-lg ${section.color.replace('text-', 'bg-').replace('-800', '-200')}`}>
                       <ReportSectionIcon iconName={section.iconName} className="h-5 w-5" />
                     </div>
                     <div className="flex-1">
                       <h4 className="font-medium text-sm">{section.name}</h4>
                       <p className="text-xs text-muted-foreground mt-1">{section.description}</p>
                       <div className="flex items-center gap-2 mt-2">
                         <div className="flex gap-1">
                           {getFrameworkBadges(section.frameworks)}
                         </div>
                         <div className="flex items-center gap-1">
                           {section.subsections.map(subsection => (
                             <div 
                               key={subsection.id}
                               className={`w-2 h-2 rounded-full ${
                                 responses[subsection.id]?.trim().length > 0 
                                   ? 'bg-green-500' 
                                   : 'bg-gray-300'
                               }`}
                             />
                           ))}
                         </div>
                       </div>
                     </div>
                   </div>
                 </CardContent>
               </Card>
             ))}
           </div>
         </div>
        </div>
      </div>
    </aside>
  );
} 