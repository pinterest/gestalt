// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import {
  ColorSchemeProvider,
  type ColorScheme,
  ColorSchemePropType,
} from './contexts/ColorScheme.js';
import {
  ScrollProvider,
} from './contexts/Scroll.js';

type Props = {|
  children: Node,
  colorScheme?: ColorScheme,
  id?: string,
|};

export default function Provider({ children, colorScheme, id }: Props): Node {
  return (
    <ScrollProvider>
      <ColorSchemeProvider colorScheme={colorScheme} id={id}>
        {children}
      </ColorSchemeProvider>
    </ScrollProvider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
  colorScheme: ColorSchemePropType,
};
