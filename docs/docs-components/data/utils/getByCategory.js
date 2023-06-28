// @flow strict
import getByPlatform from './getByPlatform.js';
import {
  type ComponentCategory,
  type ComponentData,
  type Platform,
  type PlatformData,
} from '../types.js';

export default function getByCategory(
  componentList: $ReadOnlyArray<ComponentData>,
  options: {| category: ComponentCategory, platform: Platform |},
): $ReadOnlyArray<PlatformData> {
  const { category, platform } = options;
  const platformComponents = getByPlatform(componentList, { platform });
  return platformComponents.filter((component) => component.category.includes(category));
}
