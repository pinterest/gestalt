// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import {
  ColorSchemeProvider,
  type ColorScheme,
  ColorSchemePropType,
} from './contexts/ColorScheme.js';
import {
  OnNavigationProvider,
  type onNavigationType,
} from './contexts/OnNavigationContext.js';

type Props = {|
  children: Node,
  colorScheme?: ColorScheme,
  id?: string,
  onNavigation?: onNavigationType,
|};

export default function Provider({
  children,
  onNavigation,
  colorScheme,
  id,
}: Props): Node {
  return (
    <ColorSchemeProvider colorScheme={colorScheme} id={id}>
      <OnNavigationProvider onNavigation={onNavigation}>
        {children}
      </OnNavigationProvider>
    </ColorSchemeProvider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
  colorScheme: ColorSchemePropType,
  onNavigation: PropTypes.func,
};
