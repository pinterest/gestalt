// @flow strict
import { type Node as ReactNode } from 'react';
import { Badge, Box, Flex, Heading, TapAreaLink, Text, WashAnimated } from 'gestalt';
import { MIN_SVG_ILLUSTRATION_WIDTH } from './IllustrationSection';
import illustrations, { type Illustrations } from '../graphics/index';

export type Props = {
  color: string,
  description?: string,
  headingLevel: 2 | 3,
  href: string,
  image: ReactNode | Illustrations,
  isNew?: boolean,
  title: string,
};

export default function IllustrationCard({
  color,
  description,
  headingLevel,
  href,
  image,
  isNew,
  title,
}: Props): ReactNode {
  // we either render the svg string, or use our lookup table to render the right illustration component
  const Illustration =
    typeof image === 'string' && illustrations[image] ? illustrations[image] : undefined;

  return (
    <TapAreaLink href={href} accessibilityLabel={`${title} page`}>
      <Box minWidth={MIN_SVG_ILLUSTRATION_WIDTH}>
        <WashAnimated>
          <Flex direction="column" height={320}>
            <Box
              display="flex"
              rounding={2}
              alignItems="center"
              justifyContent="center"
              height="60%"
              width="100%"
              dangerouslySetInlineStyle={{
                __style: {
                  backgroundColor: `var(--color-${color})`,
                },
              }}
            >
              {Illustration ? <Illustration /> : image}
            </Box>
            <Box
              color="default"
              height="40%"
              paddingY={6}
              display="flex"
              direction="column"
              justifyContent="start"
            >
              <Flex
                direction="row"
                alignItems="baseline"
                gap={{
                  row: 2,
                  column: 0,
                }}
              >
                <Heading accessibilityLevel={headingLevel} size="400">
                  {title}
                </Heading>
                {isNew && <Badge text="New" />}
              </Flex>
              <Box paddingY={2}>
                <Text>{description}</Text>
              </Box>
            </Box>
          </Flex>
        </WashAnimated>
      </Box>
    </TapAreaLink>
  );
}
