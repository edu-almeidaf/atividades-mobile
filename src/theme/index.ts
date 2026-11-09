export const colors = {
  background: '#F2F4F7',
  surface: '#FFFFFF',
  border: '#E4E7EC',
  text: '#101828',
  textMuted: '#667085',
  header: '#1D2939',
  headerText: '#FFFFFF',
  chip: '#F2F4F7',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
} as const;

const categoryColors: Record<string, string> = {
  Adventure: '#F79009',
  Classic: '#9E77ED',
  Cruiser: '#2E90FA',
  Naked: '#667085',
  'Off-Road': '#12B76A',
  Sport: '#F04438',
  Touring: '#0BA5EC',
};

export function getCategoryColor(category: string): string {
  return categoryColors[category] ?? '#98A2B3';
}
