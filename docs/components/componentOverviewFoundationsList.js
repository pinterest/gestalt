// @flow strict
import Accessibility from '../graphics/foundations/accessibility.svg';
import Color from '../graphics/foundations/color.svg';
import DesignTokens from '../graphics/foundations/design-tokens.svg';
import IconographySvg from '../graphics/foundations/iconography-svg.svg';
import Layouts from '../graphics/foundations/layouts.svg';
import ScreenSizes from '../graphics/foundations/screen-size.svg';
import { type ListItemType } from '../pages/component_overview.js';

const FOUNDATIONS: ListItemType = [
  {
    svg: <Accessibility />,
    name: 'Accessibility',
    description: 'Accessibility best practices at Pinterest.',
    category: 'Foundations',
  },
  {
    svg: <Color />,
    name: 'Color palette',
    description: 'Color palettes shared between Brand and Gestalt.',
    category: 'Foundations',
    path: '/color_palette',
  },
  {
    svg: <DesignTokens />,
    name: 'Design tokens',
    description: 'Values used within Gestalt to construct layouts and components.',
    category: 'Foundations',
  },
  {
    svg: <IconographySvg />,
    name: 'Iconography and SVGs',
    description: 'Symbolic representations of an action or information.',
    category: 'Foundations',
  },
  {
    svg: <Layouts />,
    name: 'Layouts',
    description: 'A list of easy-to-copy layouts which have best battle tests.',
    category: 'Foundations',
  },
  {
    svg: <ScreenSizes />,
    name: 'Screen sizes',
    description: 'The screen sizes that Pinterest operates on.',
    category: 'Foundations',
  },
];

export default FOUNDATIONS;
