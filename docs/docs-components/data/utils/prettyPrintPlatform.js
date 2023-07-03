// @flow strict
import { type Platform } from '../types.js';

const prettyPlatforms = {
  android: 'Android',
  figma: 'Figma',
  ios: 'iOS',
  web: 'Web',
};

export default function prettyPrintPlatform(platform: Platform): string {
  return prettyPlatforms[platform];
}
