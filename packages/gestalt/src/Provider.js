// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import {
  ColorSchemeProvider,
  type ColorScheme,
  ColorSchemePropType,
} from './contexts/ColorScheme.js';
import {
  OnLinkClickProvider,
  type onLinkClickType,
} from './contexts/OnLinkClickContext.js';

type Props = {|
  children: Node,
  colorScheme?: ColorScheme,
  id?: string,
  onLinkClick?: onLinkClickType,
|};

export default function Provider({
  children,
  onLinkClick,
  colorScheme,
  id,
}: Props): Node {
  return (
    <ColorSchemeProvider colorScheme={colorScheme} id={id}>
      <OnLinkClickProvider onLinkClick={onLinkClick}>
        {children}
      </OnLinkClickProvider>
    </ColorSchemeProvider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
  colorScheme: ColorSchemePropType,
  onLinkClick: PropTypes.func,
};
