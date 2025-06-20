'use client';

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-esg-black py-12 border-t border-esg-gray/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">WATCHDOG.CO</h3>
            <p className="text-gray-400 mb-4 text-sm">
              생성형 AI를 활용한 ESG 규제 대응 솔루션 제공
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">제품</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white">ESG 분석 도구</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">AI 리포팅</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">데이터 대시보드</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">프리미엄 기능</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">회사</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white">소개</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">블로그</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">채용</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">파트너십</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">지원</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white">고객 지원</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">문서</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">법적 고지</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">개인정보처리방침</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-esg-gray/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2025 Watchdog.co, Inc. All rights reserved.</p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="hover:text-white">개인정보처리방침</a>
            <a href="#" className="hover:text-white">이용약관</a>
            <a href="#" className="hover:text-white">사이트맵</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 