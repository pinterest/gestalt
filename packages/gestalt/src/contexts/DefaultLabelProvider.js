// @flow strict
import { type Context, type Node, createContext, useContext } from 'react';

/**
 * To add new labels:
 * - Create a type for the component's labels (these types need to be flat, *not* nested)
 * - Add component labels type to DefaultLabelContextType keyed by component name
 * - Add fallback labels to fallbackLabels below
 */

export type DefaultLabelContextType = {|
  AlertModal: {|
    accessibilityDismissButtonLabel: string,
  |},
  ComboBox: {|
    accessibilityClearButtonLabel: string,
  |},
  TextField: {|
    accessibilityHidePasswordLabel: string,
    accessibilityShowPasswordLabel: string,
  |},
|};

export const fallbackLabels: DefaultLabelContextType = {
  AlertModal: {
    accessibilityDismissButtonLabel: 'Close modal',
  },
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

type Props = {|
  children: Node,
  /**
   * An object describing the default strings to be used by supported component labels throughout your app. If your app supports i18n, don't forget to translate your strings!
   *
   * Note that all supported labels for all supported components must be provided if using this Provider. Omit this prop to use default (English) strings for supported labels.
   *
   * See [the source code](https://github.com/pinterest/gestalt/blob/master/packages/gestalt/src/contexts/DefaultLabelProvider.js) for the specific shape of this object.
   */
  labels?: null | DefaultLabelContextType,
|};

/**
 * [DefaultLabelProvider](https://gestalt.pinterest.systems/web/utilities/defaultlabelprovider) is an optional [React Context provider](https://reactjs.org/docs/context.html#contextprovider) to provide default strings for Gestalt component labels that support it. This allows for faster development by reducing boilerplate props at the callsite.
 */
export default function DefaultLabelProvider({ children, labels }: Props): Node {
  return <DefaultLabelContext.Provider value={labels}>{children}</DefaultLabelContext.Provider>;
}

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
