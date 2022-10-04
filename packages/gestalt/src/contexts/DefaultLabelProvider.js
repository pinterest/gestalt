// @flow strict
import { type Context, createContext, useContext } from 'react';

/**
 * To add new labels:
 * - Create a type for the component's labels (these types need to be flat, *not* nested)
 * - Add component labels type to DefaultLabelContextType keyed by component name
 * - Add fallback labels to fallbackLabels below
 */

export type DefaultLabelContextType = {|
  ComboBox: {|
    accessibilityClearButtonLabel: string,
  |},
  TextField: {|
    accessibilityHidePasswordLabel: string,
    accessibilityShowPasswordLabel: string,
  |},
|};

export const fallbackLabels: DefaultLabelContextType = {
  ComboBox: {
    accessibilityClearButtonLabel: 'Clear input',
  },
  TextField: {
    accessibilityHidePasswordLabel: 'Hide password',
    accessibilityShowPasswordLabel: 'Show password',
  },
};

const DefaultLabelContext: Context<?DefaultLabelContextType> =
  createContext<?DefaultLabelContextType>(null);

const DefaultLabelProvider = DefaultLabelContext.Provider;
export default DefaultLabelProvider;

type ValidComponent = $Keys<DefaultLabelContextType>;

export function useDefaultLabelContext<C: ValidComponent>(
  componentName: C,
): $ElementType<DefaultLabelContextType, C> {
  const labels = useContext(DefaultLabelContext);

  // If no Context value provided, return fallback labels
  if (!labels) {
    return fallbackLabels[componentName];
  }

  return labels[componentName];
}
