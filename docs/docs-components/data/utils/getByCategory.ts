import getByPlatform from './getByPlatform';
import { ComponentCategory, ComponentData, Platform, PlatformData } from '../types';

/**
 * Gets all components for a given platform and category, returning an array of just the data for that platform.
 */

export default function getByCategory(
  componentList: ReadonlyArray<ComponentData>,
  options: {
    category: ComponentCategory;
    platform: Platform;
  },
): ReadonlyArray<PlatformData> {
  const { category, platform } = options;
  const platformComponents = getByPlatform(componentList, { platform });
  return platformComponents.filter((component) => component.category.includes(category));
}
