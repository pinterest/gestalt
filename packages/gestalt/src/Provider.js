// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import { OnNavigationProvider, type onNavigationType } from './contexts/OnNavigation.js';
import {
  ColorSchemeProvider,
  type ColorScheme,
  ColorSchemePropType,
} from './contexts/ColorScheme.js';

type Props = {|
  children: Node,
  colorScheme?: ColorScheme,
  id?: string,
  onNavigation?: onNavigationType,
|};

export default function Provider({ children, colorScheme, id, onNavigation }: Props): Node {
  return (
    <ColorSchemeProvider colorScheme={colorScheme} id={id}>
      <OnNavigationProvider onNavigation={onNavigation}>{children}</OnNavigationProvider>
    </ColorSchemeProvider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
  colorScheme: ColorSchemePropType,
  id: PropTypes.string,
  onNavigation: PropTypes.func,
};
