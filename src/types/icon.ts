export interface IconData {
  name: string;
  category: string;
  keywords: string[];
  svgContent: string;
  weights: IconWeight[];
}

export type IconWeight = 'all' | 'thin' | 'light' | 'regular' | 'fill' | 'duotone';

export type ViewMode = 'grid' | 'list';

export interface IconProps {
  size?: number;
  weight?: IconWeight;
  color?: string;
  strokeWidth?: number;
  weights: Record<IconWeight, string>; // each weight has its own SVG
}