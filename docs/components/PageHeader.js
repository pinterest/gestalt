// @flow strict
import { type Node, type Element } from 'react';
import { Badge, Box, Flex, Heading, Text, Tooltip, SlimBanner } from 'gestalt';
import Markdown from './Markdown.js';
import MainSection from './MainSection.js';
import trackButtonClick from './buttons/trackButtonClick.js';

const buildSourceLinkPath = (componentName) => {
  const packageName = componentName === 'DatePicker' ? 'gestalt-datepicker' : 'gestalt';
  return `packages/${packageName}/src/${componentName}.js`;
};

const buildSourceLinkUrl = (componentName) =>
  ['https://github.com/pinterest/gestalt/blob/master', buildSourceLinkPath(componentName)].join(
    '/',
  );

type Props = {|
  badge?: 'pilot' | 'deprecated',
  defaultCode?: string,
  description?: string,
  fileName?: string, // only use if name !== file name
  folderName?: string, // only use if name !== file name and the link should point to a directory
  name: string,
  shadedCodeExample?: boolean,
  showSourceLink?: boolean,
  slimBanner?: Element<typeof SlimBanner> | null,
|};

export default function PageHeader({
  badge,
  defaultCode,
  description = '',
  fileName,
  folderName,
  name,
  shadedCodeExample,
  showSourceLink = true,
  slimBanner = null,
}: Props): Node {
  const sourcePathName = folderName ?? fileName ?? name;
  let sourceLink = buildSourceLinkUrl(sourcePathName);
  if (folderName) {
    // Strip the file extension if linking to a folder
    sourceLink = sourceLink.replace(/\.js$/, '');
  }

  const badgeMap = {
    pilot: {
      text: 'Pilot',
      tooltipText: `This is the initial version of ${name}, and additional (non-breaking) functionality is planned for the future. Any feedback is greatly appreciated!`,
    },
    deprecated: {
      text: 'Deprecated',
      tooltipText: `This component is deprecated and will be removed soon`,
      type: 'error',
    },
  };

  return (
    <Box
      marginBottom={defaultCode ? 0 : 2}
      dangerouslySetInlineStyle={{
        __style: {
          paddingBottom: '1px',
        },
      }}
    >
      <Flex direction="column" gap={defaultCode ? 8 : 0}>
        <Flex direction="column" gap={2}>
          <Flex alignItems="baseline" direction="row" gap={2} justifyContent="between" wrap>
            <Heading>
              {name}{' '}
              {badge ? (
                <Tooltip inline text={badgeMap[badge].tooltipText}>
                  <Badge
                    text={badgeMap[badge].text}
                    position="top"
                    type={badgeMap[badge].type || 'info'}
                  />
                </Tooltip>
              ) : null}
            </Heading>

            {showSourceLink && (
              <a
                href={sourceLink}
                onClick={() => trackButtonClick('View source on GitHub', sourcePathName)}
                target="blank"
              >
                <Text underline>View source on GitHub</Text>
              </a>
            )}
          </Flex>

          {description && <Markdown text={description} />}
          {slimBanner}
        </Flex>

        {defaultCode && (
          <MainSection.Card
            cardSize="lg"
            showCode={false}
            defaultCode={defaultCode}
            shaded={shadedCodeExample}
          />
        )}
      </Flex>
    </Box>
  );
}
