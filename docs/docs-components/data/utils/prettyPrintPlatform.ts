import { type Platform } from '../types';

const prettyPlatforms = {
  android: 'Android',
  figma: 'Figma',
  ios: 'iOS',
  web: 'Web',
} as const;

export default function prettyPrintPlatform(platform: Platform): string {
  return prettyPlatforms[platform];
}
