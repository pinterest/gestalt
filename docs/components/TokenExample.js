// @flow strict
import type { Node } from 'react';
import { Box } from 'gestalt';
import { type Token } from '../pages/design_tokens.js';

type BaseProps = {|
  token: Token,
|};

type FontBoxProps = {|
  ...BaseProps,
  type?: string,
|};

type ExampleProps = {|
  ...BaseProps,
  category: string,
|};

export function ColorBox({ token }: BaseProps): Node {
  return <Box
    dangerouslySetInlineStyle={{
      __style: { backgroundColor: `var(--${token.name})` },
    }}
    height={50}
    width={250}
    display="flex"
    alignItems="center"
    justifyContent="between"
    paddingX={2}
    borderStyle={token.name.includes('inverse') ? 'sm' : 'none'}
  />
}

export function SpacingBox({ token }: BaseProps): Node {
  return <Box color="eggplant" width={`${token.value}`} height={`${token.value}`} />
}

export function TextColorBox({ token }: BaseProps): Node {
  return <Box
    dangerouslySetInlineStyle={{
      __style: { color: `var(--${token.name})`, fontSize: '32px' },
    }}
    height={50}
    width={150}
    display="flex"
    alignItems="center"
    justifyContent="between"
    paddingX={2}
    color={token.name.includes('inverse') ? 'darkGray' : undefined}
  >
    Gestalt
  </Box>
}

export function FontBox({ token, type }: FontBoxProps): Node {
  const fontWeightStyle = type === 'weight' ? `var(--${token.name})` : undefined;
  const fontFamilyStyle = type === 'family' ? `var(--${token.name})` : undefined;
  const fontSizeStyle = type === 'size' ? `var(--${token.name})` : `var(--font-size-600)`;

  return (
    <Box
      dangerouslySetInlineStyle={{
        __style: {
          fontWeight: fontWeightStyle,
          fontFamily: fontFamilyStyle,
          fontSize: fontSizeStyle,
          color: 'var(--color-text-default)',
        },
      }}
      height={50}
      width={150}
      display="flex"
      alignItems="center"
      justifyContent="between"
      paddingX={2}
    >
      {token.name.includes('japanese') ? 'ゲシュタルト' : 'Gestalt'}
    </Box>
  );
}

export function TokenExample({ token, category }: ExampleProps): Node {
  switch (category) {
    case 'background-color':
      return <ColorBox token={token} />;
    case 'spacing':
      return <SpacingBox token={token} />;
    case 'text-color':
      return <TextColorBox token={token} />;
    case 'font-size':
      return <FontBox token={token} type="size" />;
    case 'font-weight':
      return <FontBox token={token} type="weight" />;
    case 'font-family':
      return <FontBox token={token} type="family" />;
    default:
      return <Box>{token.value}</Box>;
  }
}
