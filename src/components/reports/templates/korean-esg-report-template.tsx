import React from 'react';
import { GRIEntry } from '@/types/gri';
import { identifyESGCategory } from '@/lib/esg-data-utils';

interface KoreanEsgReportTemplateProps {
  reportData: GRIEntry[];
  companyName: string;
}

const KoreanEsgReportTemplate = React.forwardRef<HTMLDivElement, KoreanEsgReportTemplateProps>(
  ({ reportData, companyName }, ref) => {
    
    const categorizedData = {
      E: reportData.filter(entry => identifyESGCategory(entry.standard.code) === 'E'),
      S: reportData.filter(entry => identifyESGCategory(entry.standard.code) === 'S'),
      G: reportData.filter(entry => identifyESGCategory(entry.standard.code) === 'G'),
      // General or uncategorized
      ETC: reportData.filter(entry => identifyESGCategory(entry.standard.code) === null),
    };

    const renderEntries = (entries: GRIEntry[]) => {
      return entries.map((entry, index) => (
        <div key={`${entry.standard.code}-${index}`} className="mb-8 entry-content">
          <h3 className="text-xl font-semibold text-gray-800 mb-2 border-b-2 pb-2">
            {entry.standard.code}: {entry.standard.title}
          </h3>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap">{entry.content}</p>
          </div>
        </div>
      ));
    };

    return (
      <div ref={ref} className="bg-white text-gray-900 font-sans">
        {/* Cover Page */}
        <div className="w-full h-screen flex flex-col justify-center items-center text-center bg-gray-50 page-break-after">
          <h1 className="text-5xl font-bold text-blue-800">2024 지속가능경영보고서</h1>
          <h2 className="text-3xl mt-4 text-gray-700">{companyName}</h2>
          <p className="mt-12 text-lg text-gray-500">ESG AI Platform에서 생성됨</p>
        </div>

        {/* Table of Contents (Placeholder) */}
        <div className="w-full h-screen flex flex-col justify-center p-20 page-break-after">
          <h2 className="text-4xl font-bold mb-12 border-b-4 pb-4">목차</h2>
          <ul className="text-xl space-y-4">
            <li className="flex justify-between"><span>환경 (Environmental)</span> <span>3</span></li>
            <li className="flex justify-between"><span>사회 (Social)</span> <span>15</span></li>
            <li className="flex justify-between"><span>지배구조 (Governance)</span> <span>25</span></li>
          </ul>
        </div>

        {/* Environmental Section */}
        {categorizedData.E.length > 0 && (
          <section className="report-section">
            <div className="w-full h-screen flex flex-col justify-center items-center bg-green-50 text-green-800 page-break-after">
              <h2 className="text-6xl font-extrabold">환경</h2>
              <p className="text-2xl mt-4">Environmental</p>
            </div>
            <div className="p-12">
              {renderEntries(categorizedData.E)}
            </div>
          </section>
        )}

        {/* Social Section */}
        {categorizedData.S.length > 0 && (
          <section className="report-section">
            <div className="w-full h-screen flex flex-col justify-center items-center bg-blue-50 text-blue-800 page-break-after">
              <h2 className="text-6xl font-extrabold">사회</h2>
              <p className="text-2xl mt-4">Social</p>
            </div>
            <div className="p-12">
              {renderEntries(categorizedData.S)}
            </div>
          </section>
        )}

        {/* Governance Section */}
        {categorizedData.G.length > 0 && (
          <section className="report-section">
            <div className="w-full h-screen flex flex-col justify-center items-center bg-indigo-50 text-indigo-800 page-break-after">
              <h2 className="text-6xl font-extrabold">지배구조</h2>
              <p className="text-2xl mt-4">Governance</p>
            </div>
            <div className="p-12">
              {renderEntries(categorizedData.G)}
            </div>
          </section>
        )}
      </div>
    );
  }
);

KoreanEsgReportTemplate.displayName = 'KoreanEsgReportTemplate';
export default KoreanEsgReportTemplate; 