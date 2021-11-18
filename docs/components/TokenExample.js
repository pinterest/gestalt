// @flow strict
import type { Node } from 'react';
import { Box } from 'gestalt';

type Token = {|
  name: string,
  value: string,
  comment: string,
  category: string,
|};

type Props = {|
  token: Token,
|};

export const ColorBox = ({ token }: Props): Node => (
  <Box
    dangerouslySetInlineStyle={{
      __style: { backgroundColor: `var(--${token?.name})` },
    }}
    height={50}
    width={250}
    display="flex"
    alignItems="center"
    justifyContent="between"
    paddingX={2}
  />
);

export const SpacingBox = ({ token }: Props): Node => (
  <Box color="eggplant" width={`${token.value}`} height={`${token.value}`} />
);
export const TextColorBox = ({ token }: Props): Node => (
  <Box
    dangerouslySetInlineStyle={{
      __style: { color: `var(--${token.name}) !important`, fontSize: '32px' },
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
);

type ExampleProps = {|
  token: Token,
  category: string,
|};

export const TokenExample = ({ token, category }: ExampleProps): Node => {
  switch (category) {
    case 'background-color':
      return <ColorBox token={token} />;
    case 'spacing':
      return <SpacingBox token={token} />;
    case 'text-color':
      return <TextColorBox token={token} />;
    default:
      return <Box>{token.value}</Box>;
  }
};
