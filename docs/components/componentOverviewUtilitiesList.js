// @flow strict
import HookFocusVisible from '../graphics/utilities/hook-focus-visible.svg';
import HookReducedMotion from '../graphics/utilities/hook-reduced-motion.svg';
import ProviderColorScheme from '../graphics/utilities/provider-color-scheme.svg';
import ProviderOnLinkNavigation from '../graphics/utilities/provider-on-link-navigation.svg';
import { type ListItemType } from '../pages/component_overview.js';

const UTILITIES: ListItemType = [
  {
    svg: <HookFocusVisible />,
    name: 'useFocusVisible',
    description:
      'useFocusVisible manages focus interactions on the page and determines whether a focus ring should be shown.',
    category: 'Utilities',
  },
  {
    svg: <HookReducedMotion />,
    name: 'useReducedMotion',
    description:
      'useReducedMotion allows a user to request that the system minimize the amount of non-essential motion.',
    category: 'Utilities',
  },
  {
    svg: <ProviderColorScheme />,
    name: 'ColorSchemeProvider',
    description: 'ColorSchemeProvider is an optional React context provider to enable dark mode.',
    category: 'Utilities',
    hasDarkBackground: true,
  },
  {
    svg: <ProviderOnLinkNavigation />,
    name: 'OnLinkNavigationProvider',
    description:
      'OnLinkNavigationProvider is a React context provider to externally control the link behavior of components further down the tree.',
    category: 'Utilities',
  },
];

export default UTILITIES;
