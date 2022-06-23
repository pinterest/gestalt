// @flow strict
import { type Node } from 'react';
import { Box, Flex, Icon, Link, Heading, Text } from 'gestalt';
import FigmaLogo from '../graphics/home-page/figma-logo.svg';
import SlackLogo from '../graphics/home-page/slack-logo.svg';
import InternalOnlyIconButton from './InternalOnlyIconButton.js';

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
    title: 'Color',
    url: 'https://www.figma.com/community/plugin/1019681360638128106/Pinterest-Brand-color-palettes',
    a11yLabel: 'Brand Color Figma Plugin',
  },
  {
    title: 'Docs',
    url: 'https://www.figma.com/community/plugin/977755389228415646/Gestalt-docs-for-Figma-(Beta)',
    a11yLabel: 'Gestalt Docs Figma Plugin',
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
    url: 'http://pinch.pinadmin.com/gestalt-design-slack',
    a11yLabel: 'Web engineering Slack channel',
  },
];
const engResources = [
  { title: 'Web repository', url: 'https://github.com/pinterest/gestalt/pull/2162' },
  { title: 'Code sandbox', url: 'https://codesandbox.io/s/k5plvp9v8v' },
];

type LinkListProps = {|
  items: Array<{|
    title: string,
    url: string,
    a11yLabel?: string,
  |}>,
  heading: string,
  isInternal?: boolean,
  icon: 'figma' | 'slack' | 'eng',
|};
function LinkList({ items, heading, icon, isInternal = true }: LinkListProps): Node {
  function getIcon(iconType: string): Node {
    switch (iconType) {
      case 'eng':
        return <Icon icon="code" size="32" accessibilityLabel="Engineering" color="default" />;
      case 'figma':
        return <FigmaLogo />;
      case 'slack':
        return <SlackLogo />;
      default:
        return null;
    }
  }

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
      <Box width="32px" display="flex" marginEnd={2}>
        {getIcon(icon)}
      </Box>

      <Flex direction="column" gap={2}>
        <Flex alignItems="center" gap={1}>
          <Heading size="400" accessibilityLevel={3}>
            {heading}
          </Heading>
          {isInternal && <InternalOnlyIconButton size="sm" />}
        </Flex>
        <Flex direction="column" gap={1}>
          {items.map((item) => (
            <Text key={item.title}>
              <Link inline href={item.url} accessibilityLabel={item.a11yLabel}>
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
          <Flex justifyContent="between" gap={4} wrap>
            <LinkList heading="Figma libraries" icon="figma" items={figmaLibraries} />

            <LinkList heading="Figma plugins" icon="figma" items={figmaPlugins} />

            <LinkList heading="Slack channels" icon="slack" items={slackChannels} />

            <LinkList heading="Engineering" isInternal={false} icon="eng" items={engResources} />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
