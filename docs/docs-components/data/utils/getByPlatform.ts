import { ComponentData, Platform, PlatformData } from '../types';

/**
 * Gets all components for a given platform, returning an array of just the data for that platform.
 */

export default function getByPlatform(
  componentList: ReadonlyArray<ComponentData>,
  options: {
    platform: Platform;
  },
): ReadonlyArray<PlatformData> {
  const { platform } = options;
// @ts-expect-error - TS2322 - Type '(PlatformData | null | undefined)[]' is not assignable to type 'readonly PlatformData[]'.
  return componentList
    .map((component) => (component.platform[platform] ? component.platform[platform] : null))
    .filter(Boolean);
}
