# Widget Name (한글명)

## 📖 Overview
위젯의 목적과 주요 기능을 2-3문장으로 설명

### Preview
![Widget Screenshot](./docs/screenshot.png)

## 🚀 Quick Start

```tsx
import { CompanyFinancialsWidget } from '@/widgets/company-financials';

// 기본 사용법
<CompanyFinancialsWidget />

// props 전달 예시
<CompanyFinancialsWidget 
  companyId="123"
  onUpdate={(data) => console.log(data)}
/>