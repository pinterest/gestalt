// @flow strict
import { type Element } from 'react';
import Accessibility from '../graphics/foundation/accessibility.svg';
import Color from '../graphics/foundation/color.svg';
import DesignTokens from '../graphics/foundation/design-tokens.svg';
import IconographySvg from '../graphics/foundation/iconography-svg.svg';
import Tooling from '../graphics/foundation/tooling.svg';
import Layouts from '../graphics/foundation/layouts.svg';
import ScreenSizes from '../graphics/foundation/screen-sizes.svg';
import { type ListItemType } from './component_overview.js';

const FOUNDATIONS: ListItemType = [
  {
    svg: <Accessibility />,
    name: 'Accessibility',
    description: 'Accessibility best practices at Pinterest.',
    category: 'foundation',
  },
  {
    svg: <Color />,
    name: 'Color palette',
    description: 'Color palettes shared between Brand and Gestalt.',
    category: 'foundation',
    path: '/color_palette'
  },
  {
    svg: <DesignTokens />,
    name: 'Design tokens',
    description: 'Values  used within Gestalt to construct layouts and components.',
    category: 'foundation',
  },
  {
    svg: <IconographySvg />,
    name: 'Iconography and SVGs',
    description: 'Symbolic representations of an action or information.',
    category: 'foundation',
  },
  {
    svg: <Layouts />,
    name: 'Layouts',
    description: 'A list of easy-to-copy layouts which have bestt battle testes.',
    category: 'foundation',
  },
  {
    svg: <ScreenSizes />,
    name: 'Screen sizes',
    description: 'The screen sizes that Pinterest operates on.',
    category: 'foundation',
  },
  {
    svg: <Tooling />,
    name: 'Tooling',
    description: 'An ecosystem of tools  used to simplify and automate tasks.',
    category: 'foundation',
  },
];

export default FOUNDATIONS;
