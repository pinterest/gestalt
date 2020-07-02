// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
import {
  ThemeProvider,
  type ColorScheme,
  ColorSchemePropType,
} from './contexts/Theme.js';

type Props = {|
  children: React.Node,
  colorScheme?: ColorScheme,
|};

export default function GestaltProvider({
  children,
  colorScheme,
}: Props): React.Node {
  return <ThemeProvider colorScheme={colorScheme}>{children}</ThemeProvider>;
}

GestaltProvider.propTypes = {
  children: PropTypes.node,
  colorScheme: ColorSchemePropType,
};
