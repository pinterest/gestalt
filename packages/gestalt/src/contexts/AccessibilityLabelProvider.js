// @flow strict
import { type Context, createContext, useContext } from 'react';

/**
 * To add new labels:
 * - Create a type for the component's labels (these types need to be flat, *not* nested)
 * - Add component labels type to AccessibilityLabelContextType keyed by component name
 * - Add fallback labels to fallbackLabels below
 */

export type AccessibilityLabelContextType = {|
  ComboBox: {|
    accessibilityClearButtonLabel: string,
  |},
  TextField: {|
    accessibilityHidePasswordLabel: string,
    accessibilityShowPasswordLabel: string,
  |},
|};

export const fallbackLabels: AccessibilityLabelContextType = {
  ComboBox: {
    accessibilityClearButtonLabel: 'Clear input',
  },
  TextField: {
    accessibilityHidePasswordLabel: 'Hide password',
    accessibilityShowPasswordLabel: 'Show password',
  },
};

const AccessibilityLabelContext: Context<?AccessibilityLabelContextType> =
  createContext<?AccessibilityLabelContextType>(null);

const AccessibilityLabelProvider = AccessibilityLabelContext.Provider;
export default AccessibilityLabelProvider;

type ValidComponent = $Keys<AccessibilityLabelContextType>;

export function useAccessibilityLabelContext<C: ValidComponent>(
  componentName: C,
): $ElementType<AccessibilityLabelContextType, C> {
  const labels = useContext(AccessibilityLabelContext);

  // If no Context value provided, return fallback labels
  if (!labels) {
    return fallbackLabels[componentName];
  }

  return labels[componentName];
}
