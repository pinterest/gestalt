import { Box } from 'gestalt';
import {
  TOKEN_COLOR_TEXT_DEFAULT,
  TOKEN_COLOR_TRANSPARENT,
  TOKEN_FONT_SIZE_500,
  TOKEN_FONT_SIZE_600,
  TOKEN_SPACE_1600,
} from 'gestalt-design-tokens';
import { Token } from '../pages/foundations/design_tokens/overview';

type BaseProps = {
  token: Token;
};

type FontBoxProps = BaseProps & {
  type?: string;
};

type ExampleProps = BaseProps & {
  category: string;
};

const HEIGHT = 50;
const WIDTH = 250;

export function ColorBox({ token }: BaseProps) {
  return (
    <Box
      alignItems="center"
      borderStyle={token.name.includes('inverse') ? 'sm' : 'none'}
      dangerouslySetInlineStyle={{
        __style: { backgroundColor: `var(--${token.name})` },
      }}
      display="flex"
      height={HEIGHT}
      justifyContent="between"
      paddingX={2}
      width={WIDTH}
    />
  );
}

export function RoundingBox({ token }: BaseProps) {
  return (
    <Box
      borderStyle="lg"
      dangerouslySetInlineStyle={{
        __style: { 'borderRadius': `var(--${token.name})` },
      }}
      height={HEIGHT}
      width={WIDTH}
    />
  );
}

export function SpacingBox({ token }: BaseProps) {
  if (token.value.includes('-')) {
    const absoluteDimension = token.value.replace(/^-/, '');
    const marginLeftDimension = `calc(64px + ${token.value})`;
    return (
      <Box
        borderStyle="lg"
        dangerouslySetInlineStyle={{
          __style: { marginLeft: marginLeftDimension },
        }}
        height={absoluteDimension}
        width={absoluteDimension}
      />
    );
  }

  return (
    <Box
      color="brand"
      dangerouslySetInlineStyle={{ __style: { marginLeft: TOKEN_SPACE_1600 } }}
      height={token.value}
      width={token.value}
    />
  );
}

export function TextColorBox({ token }: BaseProps) {
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
      alignItems="center"
      // @ts-expect-error - TS2322 - Type 'string | undefined' is not assignable to type '"selected" | "default" | "shopping" | "inverse" | "light" | "dark" | "darkWash" | "lightWash" | "transparent" | "transparentDarkGray" | "infoBase" | "infoWeak" | "errorBase" | ... 15 more ... | undefined'.
      color={backgroundColor}
      dangerouslySetInlineStyle={{
        __style: { color: `var(--${token.name})`, fontSize: TOKEN_FONT_SIZE_500 },
      }}
      display="flex"
      height={HEIGHT}
      justifyContent="between"
      paddingX={2}
      width={WIDTH}
    >
      Gestalt
    </Box>
  );
}

export function BorderBox({ token }: BaseProps) {
  return (
    <Box
      alignItems="center"
      dangerouslySetInlineStyle={{
        __style: { border: `2px solid var(--${token.name})` },
      }}
      display="flex"
      height={HEIGHT}
      justifyContent="between"
      paddingX={2}
      width={WIDTH}
    />
  );
}

export function OpacityBox({ token }: BaseProps) {
  return (
    <Box
      alignItems="center"
      color="recommendationWeak"
      display="flex"
      height={HEIGHT}
      justifyContent="center"
      width={WIDTH}
    >
      <Box
        color="inverse"
        dangerouslySetInlineStyle={{
          __style: { opacity: `var(--${token.name})` },
        }}
        height={HEIGHT}
        width={WIDTH}
      />
    </Box>
  );
}

export function ElevationBox({ token }: BaseProps) {
  return (
    <Box
      alignItems="center"
      dangerouslySetInlineStyle={{
        __style: {
          boxShadow: `var(--${token.name})`,
          backgroundColor: token.name.includes('color')
            ? `var(--${token.name})`
            : TOKEN_COLOR_TRANSPARENT,
        },
      }}
      display="flex"
      height={HEIGHT}
      justifyContent="between"
      paddingX={2}
      width={WIDTH}
    />
  );
}

export function FontBox({ token, type }: FontBoxProps) {
  const fontWeightStyle = type === 'weight' ? `var(--${token.name})` : undefined;
  const fontFamilyStyle = type === 'family' ? `var(--${token.name})` : undefined;
  const fontSizeStyle = type === 'size' ? `var(--${token.name})` : TOKEN_FONT_SIZE_600;

  return (
    <Box
      alignItems="center"
      dangerouslySetInlineStyle={{
        __style: {
          fontWeight: fontWeightStyle,
          fontFamily: fontFamilyStyle,
          fontSize: fontSizeStyle,
          color: TOKEN_COLOR_TEXT_DEFAULT,
        },
      }}
      display="flex"
      height={HEIGHT}
      justifyContent="between"
      paddingX={2}
      width={WIDTH}
    >
      {token.name.includes('japanese') ? 'ゲシュタルト' : 'Gestalt'}
    </Box>
  );
}

export function TokenExample({ token, category }: ExampleProps) {
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
