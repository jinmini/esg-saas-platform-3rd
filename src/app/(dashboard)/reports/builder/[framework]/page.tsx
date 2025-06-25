"use client";

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function FrameworkBuilderPage() {
  const params = useParams();
  const router = useRouter();
  const framework = params.framework as string;

  useEffect(() => {
    // 프레임워크별로 해당 하위 페이지로 리다이렉트
    if (framework) {
      router.push(`/reports/builder/${framework}/${framework}`);
    }
  }, [framework, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">로딩 중...</h1>
        <p className="text-muted-foreground">
          {framework} 빌더로 이동하고 있습니다.
        </p>
      </div>
    </div>
  );
}
