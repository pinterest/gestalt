// @flow strict
import getByPlatform from './getByPlatform.js';
import {
  type ComponentCategory,
  type ComponentData,
  type Platform,
  type PlatformData,
} from '../types.js';

/**
 * Gets all components for a given platform and category, returning an array of just the data for that platform.
 */

export default function getByCategory(
  componentList: $ReadOnlyArray<ComponentData>,
  options: {| category: ComponentCategory, platform: Platform |},
): $ReadOnlyArray<PlatformData> {
  const { category, platform } = options;
  const platformComponents = getByPlatform(componentList, { platform });
  return platformComponents.filter((component) => component.category.includes(category));
}
