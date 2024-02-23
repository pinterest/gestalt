// @flow strict
import { type Node as ReactNode } from 'react';
import { Box } from 'gestalt';
import { type Token } from '../pages/foundations/design_tokens/overview';

type BaseProps = {
  token: Token,
};

type FontBoxProps = {
  ...BaseProps,
  type?: string,
};

type ExampleProps = {
  ...BaseProps,
  category: string,
};

const HEIGHT = 50;
const WIDTH = 250;

export function ColorBox({ token }: BaseProps): ReactNode {
  return (
    <Box
      dangerouslySetInlineStyle={{
        __style: { backgroundColor: `var(--${token.name})` },
      }}
      height={HEIGHT}
      width={WIDTH}
      display="flex"
      alignItems="center"
      justifyContent="between"
      paddingX={2}
      borderStyle={token.name.includes('inverse') ? 'sm' : 'none'}
    />
  );
}

export function RoundingBox({ token }: BaseProps): ReactNode {
  return (
    <Box
      dangerouslySetInlineStyle={{
        __style: { 'borderRadius': `var(--${token.name})` },
      }}
      borderStyle="lg"
      height={HEIGHT}
      width={WIDTH}
    />
  );
}

export function SpacingBox({ token }: BaseProps): ReactNode {
  if (token.value.includes('-')) {
    const absoluteDimension = token.value.replace(/^-/, '');
    const marginLeftDimension = `calc(64px + ${token.value})`;
    return (
      <Box
        dangerouslySetInlineStyle={{
          __style: { marginLeft: marginLeftDimension },
        }}
        borderStyle="lg"
        width={absoluteDimension}
        height={absoluteDimension}
      />
    );
  }

  return (
    <Box
      dangerouslySetInlineStyle={{ __style: { marginLeft: '64px' } }}
      color="brand"
      width={token.value}
      height={token.value}
    />
  );
}

export function TextColorBox({ token }: BaseProps): ReactNode {
  let backgroundColor;
  if (token.name.includes('inverse')) {
    backgroundColor = 'selected';
  } else if (token.name.includes('light')) {
    backgroundColor = 'dark';
  } else if (token.name.includes('dark')) {
    backgroundColor = 'light';
  }

  return (
    <Box
      dangerouslySetInlineStyle={{
        __style: { color: `var(--${token.name})`, fontSize: '32px' },
      }}
      height={HEIGHT}
      width={WIDTH}
      display="flex"
      alignItems="center"
      justifyContent="between"
      paddingX={2}
      color={backgroundColor}
    >
      Gestalt
    </Box>
  );
}

export function BorderBox({ token }: BaseProps): ReactNode {
  return (
    <Box
      dangerouslySetInlineStyle={{
        __style: { border: `2px solid var(--${token.name})` },
      }}
      height={HEIGHT}
      width={WIDTH}
      display="flex"
      alignItems="center"
      justifyContent="between"
      paddingX={2}
    />
  );
}

export function OpacityBox({ token }: BaseProps): ReactNode {
  return (
    <Box
      color="recommendationWeak"
      height={HEIGHT}
      width={WIDTH}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        dangerouslySetInlineStyle={{
          __style: { opacity: `var(--${token.name})` },
        }}
        height={HEIGHT}
        width={WIDTH}
        color="inverse"
      />
    </Box>
  );
}

export function ElevationBox({ token }: BaseProps): ReactNode {
  return (
    <Box
      dangerouslySetInlineStyle={{
        __style: {
          boxShadow: `var(--${token.name})`,
          backgroundColor: token.name.includes('color') ? `var(--${token.name})` : 'transparent',
        },
      }}
      height={HEIGHT}
      width={WIDTH}
      display="flex"
      alignItems="center"
      justifyContent="between"
      paddingX={2}
    />
  );
}

export function FontBox({ token, type }: FontBoxProps): ReactNode {
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
      height={HEIGHT}
      width={WIDTH}
      display="flex"
      alignItems="center"
      justifyContent="between"
      paddingX={2}
    >
      {token.name.includes('japanese') ? 'ゲシュタルト' : 'Gestalt'}
    </Box>
  );
}

export function TokenExample({ token, category }: ExampleProps): ReactNode {
  let example;

  switch (category) {
    case 'color-background':
    case 'color-data-visualization':
      example = <ColorBox token={token} />;
      break;

    case 'color-text':
    case 'color-icon':
      example = <TextColorBox token={token} />;
      break;

    case 'color-border':
      example = <BorderBox token={token} />;
      break;

    case 'elevation':
      example = <ElevationBox token={token} />;
      break;

    case 'opacity':
      example = <OpacityBox token={token} />;
      break;

    case 'rounding':
      example = <RoundingBox token={token} />;
      break;

    case 'spacing':
      example = <SpacingBox token={token} />;
      break;

    case 'font-size':
      example = <FontBox token={token} type="size" />;
      break;

    case 'font-weight':
      example = <FontBox token={token} type="weight" />;
      break;

    case 'font-family':
      example = <FontBox token={token} type="family" />;
      break;

    default:
      example = <Box>{token.value}</Box>;
      break;
  }

  return token.name.includes('disabled') ? (
    <div className="skip-accessibility-check">{example}</div>
  ) : (
    example
  );
}
