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

export function ColorBox({ token }: BaseProps): ReactNode {
  return (
    <Box
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
  );
}

export function RoundingBox({ token }: BaseProps): ReactNode {
  return (
    <Box
      dangerouslySetInlineStyle={{
        __style: { 'borderRadius': `var(--${token.name})` },
      }}
      borderStyle="lg"
      width={64}
      height={64}
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
  if (token.name.includes('inverse') || token.name.includes('light')) {
    backgroundColor = 'selected';
  } else if (token.name.includes('dark')) {
    backgroundColor = 'default';
  }

  return (
    <Box
      dangerouslySetInlineStyle={{
        __style: { color: `var(--${token.name})`, fontSize: '32px' },
      }}
      height={50}
      width={150}
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
      height={50}
      width={150}
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
      width={175}
      height={75}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        dangerouslySetInlineStyle={{
          __style: { opacity: `var(--${token.name})` },
        }}
        height={50}
        width={150}
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
      height={50}
      width={150}
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

export function TokenExample({ token, category }: ExampleProps): ReactNode {
  switch (category) {
    case 'color-background':
    case 'color-data-visualization':
      return <ColorBox token={token} />;
    case 'color-text':
    case 'color-icon':
      return <TextColorBox token={token} />;
    case 'color-border':
      return <BorderBox token={token} />;
    case 'elevation':
      return <ElevationBox token={token} />;
    case 'opacity':
      return <OpacityBox token={token} />;
    case 'rounding':
      return <RoundingBox token={token} />;
    case 'spacing':
      return <SpacingBox token={token} />;
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
