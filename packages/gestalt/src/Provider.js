// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import {
  ColorSchemeProvider,
  type ColorScheme,
  ColorSchemePropType,
} from './contexts/ColorScheme.js';
import { ScrollableBoxStoreProvider } from './contexts/ScrollableBoxStore.js';

type Props = {|
  children: Node,
  colorScheme?: ColorScheme,
  id?: string,
|};

export default function Provider({ children, colorScheme, id }: Props): Node {
  return (
    <ScrollableBoxStoreProvider>
      <ColorSchemeProvider colorScheme={colorScheme} id={id}>
        {children}
      </ColorSchemeProvider>
    </ScrollableBoxStoreProvider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
  colorScheme: ColorSchemePropType,
  id: PropTypes.string,
};
