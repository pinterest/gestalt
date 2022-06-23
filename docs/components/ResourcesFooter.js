// @flow strict
import { type Node } from 'react';
import { Box, Flex, Icon, Link, Heading, Text } from 'gestalt';
import FigmaLogo from '../graphics/home-page/figma-logo.svg';
import SlackLogo from '../graphics/home-page/slack-logo.svg';

type LinkListProps = {|
  children: Node,
  heading: string,
  isInternal?: boolean,
  icon: 'figma' | 'slack' | 'eng',
|};
function LinkList({ children, heading, icon, isInternal = true }: LinkListProps): Node {
  return (
    <Flex alignItems="start" gap={2}>
      <Box width="32px" display="flex">
        {
          {
            'figma': <FigmaLogo />,
            'slack': <SlackLogo />,
            'eng': <Icon icon="code" size="32" accessibilityLabel="Engineering" color="default" />,
          }[icon]
        }
      </Box>

      <Flex direction="column" gap={2}>
        <Flex alignItems="center" gap={1}>
          <Heading size="300" accessibilityLevel={3}>
            {heading}
          </Heading>
          {isInternal && <Icon accessibilityLabel="Internal only" icon="lock" size="14" />}
        </Flex>
        <Flex direction="column" gap={1}>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default function ResourcesFooter(): Node {
  return (
    <Box
      padding={8}
      display="none"
      mdDisplay="flex"
      justifyContent="center"
      dangerouslySetInlineStyle={{
        __style: {
          backgroundColor: 'var(--color-orange-firetini-0)',
        },
      }}
    >
      <Box paddingX={6} maxWidth={1200} display="flex" flex="grow" justifyContent="start">
        <Flex direction="column" gap={4} flex="grow">
          <Heading size="500">Resources</Heading>
          <Flex justifyContent="between" gap={4}>
            <LinkList heading="Figma libraries" icon="figma">
              <Text>
                <Link
                  inline
                  href="https://www.figma.com/file/vjhfBsOtHw0wVg67vqwz1v/Gestalt-for-web"
                  accessibilityLabel="Figma Web Library"
                >
                  Web
                </Link>
              </Text>
              <Text>
                <Link
                  inline
                  href="https://www.figma.com/file/AHcKJDgb7E7YswlgW1wY8E/Gestalt-for-iOS"
                  accessibilityLabel="Figma iOS Library"
                >
                  iOS
                </Link>
              </Text>
              <Text>
                <Link
                  inline
                  href="https://www.figma.com/file/REw1COFYAktmVWrUBh3Ov8/Gestalt-for-Android"
                  accessibilityLabel="Figma Android Library"
                >
                  Android
                </Link>
              </Text>
            </LinkList>
            <LinkList heading="Figma plugins" icon="figma">
              <Text>
                <Link
                  inline
                  href="https://www.figma.com/community/plugin/1019681360638128106/Pinterest-Brand-color-palettes"
                  accessibilityLabel="Brand Color Figma Plugin"
                >
                  Color
                </Link>
              </Text>
              <Text>
                <Link
                  inline
                  href="https://www.figma.com/community/plugin/977755389228415646/Gestalt-docs-for-Figma-(Beta)"
                  accessibilityLabel="Gestalt Docs Figma Plugin"
                >
                  Docs
                </Link>
              </Text>
            </LinkList>
            <LinkList heading="Slack channels" icon="slack">
              <Text>
                <Link
                  inline
                  href="http://pinch.pinadmin.com/gestalt-design-slack"
                  accessibilityLabel="Design Slack channel"
                >
                  Design
                </Link>
              </Text>
              <Text>
                <Link
                  inline
                  href="http://pinch.pinadmin.com/gestalt-web-slack"
                  accessibilityLabel="Web engineering slack channel"
                >
                  Engineering
                </Link>
              </Text>
            </LinkList>
            <LinkList heading="Engineering" isInternal={false} icon="eng">
              <Text>
                <Link inline href="https://github.com/pinterest/gestalt/pull/2162">
                  Web repository
                </Link>
              </Text>
              <Text>
                <Link inline href="https://codesandbox.io/s/k5plvp9v8v">
                  Code sandbox
                </Link>
              </Text>
            </LinkList>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
