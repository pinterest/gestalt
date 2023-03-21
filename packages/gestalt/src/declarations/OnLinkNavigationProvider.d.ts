import type { Element, Node } from 'react';
export type OnLinkNavigationType = (arg0: {
  href: string;
  target?: null | 'self' | 'blank';
}) => ((arg0: { readonly event: React.SyntheticEvent }) => void) | null | undefined;
type OnLinkNavigationContextType = {
  onNavigation: OnLinkNavigationType;
};
type Props = {
  /**
   *
   */
  children: Node;
  /**
   * If passed, it replaces the default link behavior with custom on navigation behavior. See [custom navigation context](https://gestalt.pinterest.systems/web/utilities/onlinknavigationprovider#Custom-link-navigation-context) variant for examples.
   */
  onNavigation?: OnLinkNavigationType;
};
declare const Provider: import('react').Provider<void | OnLinkNavigationContextType>;
/**
 * [OnLinkNavigationProvider](https://gestalt.pinterest.systems/web/utilities/onlinknavigationprovider) is a [React context provider](https://reactjs.org/docs/context.html#contextprovider) to externally control the link behavior of components further down the tree.
 */
export default function OnLinkNavigationProvider({
  children,
  onNavigation,
}: Props): Element<typeof Provider>;
export declare function useOnLinkNavigation({
  href,
  target,
}: {
  href: string;
  target?: null | 'self' | 'blank';
}): ((arg0: { readonly event: React.SyntheticEvent }) => void) | null | undefined;
export {};
