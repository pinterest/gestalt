import {ComponentData, Platform, PlatformData} from '../types';

/**
 * Gets all components for a given platform, returning an array of just the data for that platform.
 */

export default function getByPlatform(
  componentList: ReadonlyArray<ComponentData>,
  options: {
    platform: Platform
  },
): ReadonlyArray<PlatformData> {
  const { platform } = options;
  return componentList
    .map((component) => (component.platform[platform] ? component.platform[platform] : null))
    .filter(Boolean);
}
