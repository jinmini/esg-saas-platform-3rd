import { ESGIssue } from '@/shared/lib/mocks/dashboard-mock-data';
import { Leaf, Users, Shield } from 'lucide-react';

export const getCategoryIcon = (category: ESGIssue['category']) => {
  switch (category) {
    case 'Environmental':
      return <Leaf className="h-4 w-4" />;
    case 'Social':
      return <Users className="h-4 w-4" />;
    case 'Governance':
      return <Shield className="h-4 w-4" />;
  }
};

export const getCategoryColor = (category: ESGIssue['category']) => {
  switch (category) {
    case 'Environmental':
      return 'text-green-600';
    case 'Social':
      return 'text-blue-600';
    case 'Governance':
      return 'text-purple-600';
  }
};

export const getPositionStyle = (businessImpact: number, stakeholderConcern: number) => ({
  left: `${businessImpact}%`,
  bottom: `${stakeholderConcern}%`,
});

export const getQuadrantInfo = (businessImpact: number, stakeholderConcern: number) => {
  if (businessImpact > 50 && stakeholderConcern > 50) return { name: '핵심', color: 'bg-red-100 border-red-200' };
  if (businessImpact > 50 && stakeholderConcern <= 50) return { name: '전략', color: 'bg-orange-100 border-orange-200' };
  if (businessImpact <= 50 && stakeholderConcern > 50) return { name: '중점', color: 'bg-yellow-100 border-yellow-200' };
  return { name: '모니터링', color: 'bg-green-100 border-green-200' };
}; 