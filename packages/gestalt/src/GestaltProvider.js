// @flow strict
import * as React from 'react';
import {
  ThemeProvider,
  type ColorScheme,
} from './contexts/Theme.js';

type Props = {|
  children: React.Node,
  colorScheme?: ColorScheme,
  id: ?string,
|};

export default function GestaltProvider({
  children,
  colorScheme,
  id,
}: Props): React.Node {
  return (
    <ThemeProvider colorScheme={colorScheme} id={id}>
      {children}
    </ThemeProvider>
  );
}
