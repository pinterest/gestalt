// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Heading } from 'gestalt';
import IllustrationContainer from './IllustrationContainer';

export const MIN_SVG_ILLUSTRATION_WIDTH = 245;

type Props = {
  children?: ReactNode,
  grid?: 'auto-fill' | 'auto-fit',
  min?: number,
  title?: string,
};

export default function IllustrationSection({
  children,
  grid = 'auto-fit',
  min = MIN_SVG_ILLUSTRATION_WIDTH,
  title,
}: Props): ReactNode {
  return (
    <IllustrationContainer justifyContent="center">
      <Flex direction="column" gap={6} maxWidth={1200} width="100%">
        {title && (
          <Heading accessibilityLevel={2} size="500">
            {title}
          </Heading>
        )}
        <Box
          width="100%"
          dangerouslySetInlineStyle={{
            __style: {
              display: 'grid',
              gridTemplateColumns: `repeat(${grid}, minmax(${min}px, 1fr))`,
              columnGap: '24px',
              rowGap: '40px',
            },
          }}
        >
          {children}
        </Box>
      </Flex>
    </IllustrationContainer>
  );
}
