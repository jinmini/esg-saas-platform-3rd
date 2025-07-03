import { ApiIntegrationTest, StorageIntegrationTest } from '@/components/test/api-integration-test'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/Tabs";

export default function ApiTestPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">시스템 통합 테스트</h1>
        <p className="text-gray-600">API 연동과 데이터 저장소 기능을 테스트합니다</p>
      </div>
      
      <Tabs defaultValue="storage" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="storage">🗄️ 저장소 테스트</TabsTrigger>
          <TabsTrigger value="api">🌐 API 테스트</TabsTrigger>
        </TabsList>
        
        <TabsContent value="storage" className="mt-6">
          <StorageIntegrationTest />
        </TabsContent>
        
        <TabsContent value="api" className="mt-6">
          <ApiIntegrationTest />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export const metadata = {
  title: '시스템 통합 테스트',
  description: 'IndexedDB 저장소와 API 연동 상태를 확인합니다',
} 