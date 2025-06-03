// Utility functions for the dashboard

export function formatLatestPostTimestamp(timestamp: number): string {
  const now = Date.now();
  const diffMs = now - timestamp;
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffMs / 60000);
  if (diffSecs < 5) return 'just now';
  if (diffMins < 1) return `${diffSecs} secs ago`;
  if (diffMins === 1) return '1 min ago';
  return `${diffMins} mins ago`;
}

export function getPriorityColor(priority: string): string {
  switch(priority) {
    case 'high': return 'border-l-red-500 bg-red-50';
    case 'medium': return 'border-l-yellow-500 bg-yellow-50';
    case 'low': return 'border-l-green-500 bg-green-50';
    default: return 'border-l-gray-500 bg-gray-50';
  }
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
} 