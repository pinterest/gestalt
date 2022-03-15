// @flow strict
import { Box, Flex, Heading } from 'gestalt';
import { type Node } from 'react';
import IllustrationContainer from './IllustrationContainer.js';

type Props = {|
  title?: string,
  children?: Node,
|};

function IllustrationSection({ children, title }: Props): Node {
  return (
    <IllustrationContainer>
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
    </IllustrationContainer>
  );
}

export default IllustrationSection;
