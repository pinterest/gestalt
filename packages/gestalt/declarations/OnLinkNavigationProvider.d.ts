import React = require('react');

export type EventHandlerType = (args: { readonly event: React.SyntheticEvent }) => void;

export interface OnNavigationArgs {
  href: string;
  target?: null | 'self' | 'blank' | undefined;
}

export type OnNavigationType = (args: OnNavigationArgs) => EventHandlerType | null | undefined;

/**
 * ColorSchemeProvider Props Interface
 * https://gestalt.netlify.app/OnLinkNavigationProvider
 */
export interface OnLinkNavigationProviderProps {
  onNavigation?: OnNavigationType | undefined;
}

export const OnLinkNavigationProvider: React.FunctionComponent<OnLinkNavigationProviderProps>;
