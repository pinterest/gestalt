// @flow strict
import { type Node } from 'react';
import { Box, Flex, Link, Heading, Text } from 'gestalt';
import LINKS from './LINK_REPOSITORY.js';
import InternalOnlyIconButton from './InternalOnlyIconButton.js';

const figmaLibraries = [
  {
    title: 'Web',
    url: LINKS.FIGMA_WEB_LIBRARY,
    a11yLabel: 'Figma Web Library',
  },
  {
    title: 'iOS',
    url: LINKS.FIGMA_IOS_LIBRARY,
    a11yLabel: 'Figma iOS Library',
  },
  {
    title: 'Android',
    url: LINKS.FIGMA_ANDROID_LIBRARY,
    a11yLabel: 'Figma Android Library',
  },
];

const figmaPlugins = [
  {
    title: 'Color',
    url: LINKS.FIGMA_COLOR_PLUGIN,
    a11yLabel: 'Brand Color Figma Plugin',
  },
  {
    title: 'Docs',
    url: LINKS.FIGMA_DOCS_PLUGIN,
    a11yLabel: 'Gestalt Docs Figma Plugin',
  },
];

const slackChannels = [
  {
    title: 'Design',
    url: LINKS.SLACK_DESIGN,
    a11yLabel: 'Design Slack channel',
  },
  {
    title: 'Engineering',
    url: LINKS.SLACK_ENGINEERING,
    a11yLabel: 'Web engineering Slack channel',
  },
];
const engResources = [
  { title: 'Web repository', url: LINKS.GESTALT_GITHUB },
  { title: 'Code sandbox', url: LINKS.CODE_SANDBOX },
];

type LinkListProps = {|
  items: $ReadOnlyArray<{|
    title: string,
    url: string,
    a11yLabel?: string,
  |}>,
  heading: string,
  isInternal?: boolean,
|};
function LinkList({ items, heading, isInternal = true }: LinkListProps): Node {
  return (
    <Box
      display="flex"
      alignSelf="start"
      marginTop={3}
      marginBottom={3}
      lgMarginTop={0}
      lgMarginBottom={0}
      alignItems="start"
    >
      <Flex
        direction="column"
        gap={{
          row: 0,
          column: 2,
        }}
      >
        <Flex
          alignItems="center"
          gap={{
            row: 1,
            column: 0,
          }}
        >
          <Heading size="400" accessibilityLevel={3}>
            {heading}
          </Heading>
          {isInternal && <InternalOnlyIconButton size="sm" />}
        </Flex>
        <Flex
          direction="column"
          gap={{
            row: 0,
            column: 1,
          }}
        >
          {items.map((item) => (
            <Text key={item.title}>
              <Link href={item.url} accessibilityLabel={item.a11yLabel}>
                {item.title}
              </Link>
            </Text>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}

export default function ResourcesFooter(): Node {
  return (
    <Box padding={8} display="none" mdDisplay="flex" justifyContent="center">
      <Box paddingX={6} maxWidth={1200} display="flex" flex="grow" justifyContent="start">
        <Flex
          direction="column"
          gap={{
            row: 0,
            column: 4,
          }}
          flex="grow"
        >
          <Heading size="500">Resources</Heading>
          <Flex
            justifyContent="between"
            gap={{
              row: 4,
              column: 0,
            }}
            wrap
          >
            <LinkList heading="Figma libraries" items={figmaLibraries} />

            <LinkList heading="Figma plugins" items={figmaPlugins} />

            <LinkList heading="Slack channels" items={slackChannels} />

            <LinkList heading="Engineering" isInternal={false} items={engResources} />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
