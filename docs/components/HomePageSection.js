// @flow strict
import { Box, Flex, Heading } from 'gestalt';
import { type Node } from 'react';

type Props = {|
  title?: string,
  children?: Node,
|};

function HomePageSection({ children, title }: Props): Node {
  return (
    <Box
      marginStart={-8}
      marginEnd={-8}
      smMarginEnd={0}
      smMarginStart={0}
      paddingX={12}
      smPaddingX={2}
      mdPaddingX={8}
      marginBottom={10}
      justifyContent="center"
      display="flex"
    >
      <Flex direction="column" gap={6} maxWidth={1200} width="100%">
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
}

export default HomePageSection;
