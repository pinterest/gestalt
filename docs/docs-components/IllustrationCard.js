// @flow strict
import { Badge, Box, Card, Flex, Heading, TapArea, Text } from 'gestalt';
import { type Node } from 'react';
import unambiguous from 'eslint-plugin-import/lib/rules/unambiguous';
import illustrations from '../graphics/index.js';

export type IllustrationCardProps = {|
  headingLevel: 2 | 3,
  image: Node | string,
  description: string,
  title: string,
  color: string,
  href: string,
  isNew?: boolean,
|};

function IllustrationCard({
  headingLevel,
  image,
  description,
  isNew,
  title,
  color,
  href,
}: IllustrationCardProps): Node {
  // we either render the svg string, or use our lookup table to render the right illustration component
  const Illustration =
    typeof image === 'string' && illustrations[image] ? illustrations[image] : undefined;

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
        </Card>
      </Box>
    </TapArea>
  );
}

export default IllustrationCard;
