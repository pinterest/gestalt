// @flow strict
import { type Element } from 'react';
import HookFocusVisible from '../graphics/utilities/hook_focus_visible.svg';
import HookReducedMotion from '../graphics/utilities/hook_reduced_motion.svg';
import ProviderColorScheme from '../graphics/utilities/provider_color_scheme.svg';
import ProviderOnLinkNavigation from '../graphics/utilities/provider_on_link_navigation.svg';
import { type ListItemType } from './component_overview.js';

const UTILITIES: ListItemType = [
  {
    svg: <HookFocusVisible />,
    name: 'useFocusVisible',
    description: 'Im a description',
    category: 'utilities',
  },
  {
    svg: <HookReducedMotion />,
    name: 'useReducedMotion',
    description: 'Im a description',
    category: 'utilities',
  },
  {
    svg: <ProviderColorScheme />,
    name: 'ColorSchemeProvider',
    description: 'Im a description',
    category: 'utilities',
  },
  {
    svg: <ProviderOnLinkNavigation />,
    name: 'OnLinkNavigationProvider',
    description: 'Im a description',
    category: 'utilities',
  },
];

export default UTILITIES;
