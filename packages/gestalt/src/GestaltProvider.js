// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import {
  ColorSchemeProvider,
  type ColorScheme,
  ColorSchemePropType,
} from './contexts/ColorScheme.js';

type Props = {|
  children: Node,
  colorScheme?: ColorScheme,
  id?: string,
|};

export default function GestaltProvider({
  children,
  colorScheme,
  id,
}: Props): Node {
  return (
    <ColorSchemeProvider colorScheme={colorScheme} id={id}>
      {children}
    </ColorSchemeProvider>
  );
}

GestaltProvider.propTypes = {
  children: PropTypes.node,
  colorScheme: ColorSchemePropType,
};
