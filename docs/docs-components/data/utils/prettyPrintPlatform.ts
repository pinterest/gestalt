import { Platform } from '../types';

const prettyPlatforms = {
  figma: 'Figma',
  web: 'Web',
} as const;

export default function prettyPrintPlatform(platform: Platform): string {
  return prettyPlatforms[platform];
}
