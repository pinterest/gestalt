export type Size = 'xs' | 'sm' | 'md' | 'fit';

export const SIZE_MAP = { xs: 24, sm: 32, md: 48, fit: '100%' } as const;

export type BaseStackType = {
  hovered?: boolean;
  pileCount: number;
  size: Size;
};
