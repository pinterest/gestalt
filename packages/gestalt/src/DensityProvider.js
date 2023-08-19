// @flow strict
import { type Node, useEffect, useRef } from 'react';

type Props = {|
  /**
   * Children that density will be applied to.
   */
  children?: React.Node,
  /**
   * Which density to apply to children.
   */
  size: 'compact' | 'comfortable' | 'spacious',
|};

// move everything down by 4px, or increment by 4px
const generateSpacingTokens = (size: 'compact' | 'comfortable' | 'spacious') => {
  let modifier = 0;

  if (size === 'compact') {
    modifier = -4;
  }

  if (size === 'spacious') {
    modifier = 4;
  }

  // generate 16 tokens
  const scale = Array.from({ length: 16 }, (_, i) => i * 4 + modifier);

  // compact mode is the only one where the scale starts at 2
  if (size === 'compact') {
    scale[1] = 2;
  }

  // base is always 0
  scale[0] = 0;

  console.log(scale);

  return scale;
};

const generateRoundingTokens = (size: 'compact' | 'comfortable' | 'spacious') => {
  let modifier = 0;

  if (size === 'compact') {
    modifier = -4;
  }

  if (size === 'spacious') {
    modifier = 4;
  }

  // generate 8 tokens
  const scale = Array.from({ length: 8 }, (_, i) => i * 4 + modifier);

  // compact mode is the only one where the scale starts at 2
  if (size === 'compact') {
    scale[1] = 2;
  }

  // base is always 0
  scale[0] = 0;

  return scale;
};

/**
 * Converts spacing tokens to dynamic variables.
 */
const themeToStyles = (size: 'compact' | 'comfortable' | 'spacious') => {
  const spacingTheme = generateSpacingTokens(size);
  const roundingTheme = generateRoundingTokens(size);

  const styles = {};

  spacingTheme.forEach((val, i) => {
    const tokenName = `--space-${i * 100}`;
    styles[tokenName] = `${val}px`;
  });

  roundingTheme.forEach((val, i) => {
    const tokenName = `--rounding-${i * 100}`;
    styles[tokenName] = `${val}px`;
  });

  return styles;
};

/**
 * [DensityProvider](https://gestalt.pinterest.systems/web/densityprovider) is an element wrapper that applies a density scale to its children. Putting an unsupported component may result in odd behavior, so take a look at the list of supported components below.
 * ![DensityProvider light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DensityProvider.spec.mjs-snapshots/DensityProvider-chromium-darwin.png)
 * ![DensityProvider dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/DensityProvider-dark.spec.mjs-snapshots/DensityProvider-dark-chromium-darwin.png)
 */
export default function DensityProvider({ children, size = 'md' }: Props): Node {
  const providerRef = useRef();

  useEffect(() => {
    if (providerRef.current) {
      const theme = themeToStyles(size);
      Object.keys(theme).forEach((key) => {
        console.log(key, theme[key]);
        providerRef.current.style.setProperty(key, theme[key]);
      });
    }
  }, [size]);

  // add a css style tag with the theme expanded inline and set as dangerous html

  return (
    <density-provider size={size} ref={providerRef}>
      {children}
    </density-provider>
  );
}
