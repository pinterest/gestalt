// @flow strict
import { Box, Flex, Heading } from 'gestalt';
import type { Node } from 'react';

type Props = {|
  color: string,
  title?: string,
  children?: Node,
|};

const HomePageSection = ({ children, color, title }: Props): Node => (
  <Box
    marginStart={-8}
    marginEnd={-8}
    smMarginEnd={0}
    smMarginStart={0}
    paddingX={12}
    smPaddingX={2}
    mdPaddingX={8}
    dangerouslySetInlineStyle={{
      __style: {
        backgroundColor: `var(--color-${color})`,
      },
    }}
    paddingY={10}
    justifyContent="center"
    display="flex"
  >
    <Flex direction="column" gap={4} maxWidth={1200} width="100%">
      {title && (
        <Heading accessibilityLevel={2} size="md">
          {title}
        </Heading>
      )}
      <Box
        width="100%"
        dangerouslySetInlineStyle={{
          __style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            columnGap: '24px',
            rowGap: '24px',
          },
        }}
      >
        {children}
      </Box>
    </Flex>
  </Box>
);

export default HomePageSection;
