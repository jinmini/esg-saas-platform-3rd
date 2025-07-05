export async function exportAnalyses(
  format: 'csv' | 'excel' | 'pdf',
  filters?: any // 필요시 AnalysisFilter import
): Promise<Blob> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analysis/export`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ format, filters }),
  });

  if (!response.ok) {
    throw new Error('Export failed');
  }

  return response.blob();
} 