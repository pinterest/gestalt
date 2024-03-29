// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Heading, Link, Text } from 'gestalt';
import InternalOnlyIconButton from './InternalOnlyIconButton';

const figmaLibraries = [
  {
    title: 'Web',
    url: 'https://www.figma.com/file/vjhfBsOtHw0wVg67vqwz1v/Gestalt-for-web',
    a11yLabel: 'Figma Web Library',
  },
  {
    title: 'iOS',
    url: 'https://www.figma.com/file/AHcKJDgb7E7YswlgW1wY8E/Gestalt-for-iOS',
    a11yLabel: 'Figma iOS Library',
  },
  {
    title: 'Android',
    url: 'https://www.figma.com/file/REw1COFYAktmVWrUBh3Ov8/Gestalt-for-Android',
    a11yLabel: 'Figma Android Library',
  },
];

const figmaPlugins = [
  {
    title: 'Pinterest Design',
    url: 'https://www.figma.com/community/plugin/1215463263194174399',
    a11yLabel: 'Pinterest Design Figma Plugin',
  },
  {
    title: 'Color',
    url: 'https://www.figma.com/community/plugin/1019681360638128106/Pinterest-Brand-color-palettes',
    a11yLabel: 'Brand Color Figma Plugin',
  },
];

const slackChannels = [
  {
    title: 'Design',
    url: 'http://pinch.pinadmin.com/gestalt-design-slack',
    a11yLabel: 'Design Slack channel',
  },
  {
    title: 'Engineering',
    url: 'http://pinch.pinadmin.com/gestalt-web-slack',
    a11yLabel: 'Web engineering Slack channel',
  },
];
const engResources = [
  { title: 'Web repository', url: 'https://github.com/pinterest/gestalt' },
  {
    title: 'Code sandbox',
    url: 'https://codesandbox.io/s/gestalt-cnwugg?file=/yourCode.js',
  },
];

type LinkListProps = {
  items: $ReadOnlyArray<{
    title: string,
    url: string,
    a11yLabel?: string,
  }>,
  heading: string,
  isInternal?: boolean,
};
function LinkList({ items, heading, isInternal = true }: LinkListProps): ReactNode {
  return (
    <Box
      alignItems="start"
      alignSelf="start"
      display="flex"
      lgMarginBottom={0}
      lgMarginTop={0}
      marginBottom={3}
      marginTop={3}
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
          <Heading accessibilityLevel={3} size="400">
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
              <Link accessibilityLabel={item.a11yLabel} href={item.url}>
                {item.title}
              </Link>
            </Text>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}

export default function ResourcesFooter(): ReactNode {
  return (
    <Box display="none" justifyContent="center" mdDisplay="flex" padding={8}>
      <Box
        display="flex"
        flex="grow"
        justifyContent="start"
        lgPaddingX={0}
        maxWidth={1200}
        paddingX={6}
      >
        <Flex
          direction="column"
          flex="grow"
          gap={{
            row: 0,
            column: 4,
          }}
        >
          <Heading size="500">Resources</Heading>
          <Flex
            gap={{
              row: 4,
              column: 0,
            }}
            justifyContent="between"
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
