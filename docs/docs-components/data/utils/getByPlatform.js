// @flow strict
import { type ComponentData, type Platform, type PlatformData } from '../types.js';

/**
 * Gets all components for a given platform, returning an array of just the data for that platform.
 */

export default function getByPlatform(
  componentList: $ReadOnlyArray<ComponentData>,
  options: {| platform: Platform |},
): $ReadOnlyArray<PlatformData> {
  const { platform } = options;
  return componentList
    .map((component) => (component.platform[platform] ? component.platform[platform] : null))
    .filter(Boolean);
}
