// @flow strict
import { Badge, Box, Card, Flex, Heading, TapArea, Text } from 'gestalt';
import type { Node } from 'react';

type Props = {|
  image: Node,
  description: string,
  title: string,
  color: string,
  href: string,
  isNew?: boolean,
|};

const HomePageCard = ({ image, description, isNew, title, color, href }: Props): Node => (
  <TapArea href={href} role="link" accessibilityLabel={`${title} page`}>
    <Box minWidth={280}>
      <Card>
        <Flex direction="column" height={320}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="50%"
            width="100%"
            dangerouslySetInlineStyle={{
              __style: {
                backgroundColor: `var(--color-${color}-450)`,
              },
            }}
          >
            {image}
          </Box>
          <Box
            color="white"
            height="50%"
            paddingY={6}
            display="flex"
            direction="column"
            justifyContent="start"
          >
            <Flex direction="row" alignItems="baseline" gap={2}>
              <Heading accessibilityLevel={3} size="sm">
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

export default HomePageCard;
