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
  size: 'sm' | 'md' | 'lg',
|};

// move everything down by 4px, or increment by 4px
const generateTheme = (size: 'sm' | 'md' | 'lg') => {
  let baseScale = 4; // 100

  if (size === 'sm') {
    baseScale = 0;
  }

  if (size === 'lg') {
    baseScale = 8;
  }
  // generate 16 iterations of the scale
  const scale = Array.from({ length: 16 }, (_, i) => i * 4 + baseScale);

  // insert a 0 at the start of the scale, so that the first item is 0
  scale.unshift(0);
  return scale;
};

/**
 * Converts spacing tokens to dynamic variables.
 */
const themeToStyles = (size: 'sm' | 'md' | 'lg') => {
  const theme = generateTheme(size);

  const styles = {};

  theme.forEach((val, i) => {
    const tokenName = `--space-${i * 100}`;
    styles[tokenName] = `${val}px`;
  });

  console.log(styles);
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
