// @flow strict
import { Badge, Box, Card, Flex, Heading, TapArea, Text } from 'gestalt';
import { type Node } from 'react';
import illustrations from '../graphics/index.js';

export type IllustrationCardProps = {|
  image: Node | string,
  description: string,
  title: string,
  color: string,
  href: string,
  isNew?: boolean,
|};

function IllustrationCard({
  image,
  description,
  isNew,
  title,
  color,
  href,
}: IllustrationCardProps): Node {
  return (
    <TapArea href={href} role="link" accessibilityLabel={`${title} page`}>
      <Box minWidth={280}>
        <Card>
          <Flex direction="column" height={320}>
            <Box
              display="flex"
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
              {typeof image === 'string' ? illustrations[image]() : image}
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
        </Card>
      </Box>
    </TapArea>
  );
}

export default IllustrationCard;
