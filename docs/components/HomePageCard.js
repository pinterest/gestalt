// @flow strict
import { Box, Card, Flex, Heading, Mask, TapArea, Text } from 'gestalt';
import type { Node } from 'react';

type Props = {|
  image?: string,
  description: string,
  title: string,
  color: string,
  href: string,
|};

const HomePageCard = ({ image, description, title, color, href }: Props): Node => (
  <Mask rounding={4}>
    <TapArea href={href} role="link">
      <Box minWidth={280}>
        <Card>
          <Flex direction="column" height={360}>
            <Box
              height="50%"
              width="100%"
              dangerouslySetInlineStyle={{
                __style: {
                  backgroundColor: `var(--color-${color}-450)`,
                },
              }}
            />
            <Box
              color="white"
              height="50%"
              padding={4}
              display="flex"
              direction="column"
              justifyContent="start"
            >
              <Heading accessibilityLevel={3} size="sm">
                {title}
              </Heading>
              <Box paddingY={2}>
                <Text>{description}</Text>
              </Box>
            </Box>
          </Flex>
        </Card>
      </Box>
    </TapArea>
  </Mask>
);

export default HomePageCard;
