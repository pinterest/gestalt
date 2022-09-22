// @flow strict
import { createContext, type Context, useContext } from 'react';
import {
  fallbackLabels,
  type AccessibilityLabelContextType,
  // eslint-disable-next-line import/no-relative-parent-imports
} from '../AccessibilityLabelProvider.js';

const MockContext: Context<?AccessibilityLabelContextType> =
  createContext<?AccessibilityLabelContextType>(fallbackLabels);
const AccessibilityLabelProvider = MockContext.Provider;
export default AccessibilityLabelProvider;

type ValidComponent = $Keys<AccessibilityLabelContextType>;

export function useI18nContext<C: ValidComponent>(
  componentName: C,
): $ElementType<AccessibilityLabelContextType, C> {
  const labels = useContext(MockContext);
  return labels ? labels[componentName] : fallbackLabels[componentName];
}
