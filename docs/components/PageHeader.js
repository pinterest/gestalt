// @flow strict
import type { Node } from 'react';
import { Badge, Box, Flex, Heading, Text, Tooltip } from 'gestalt';
import Markdown from './Markdown.js';
import MainSection from './MainSection.js';
import trackButtonClick from './buttons/trackButtonClick.js';

type Props = {|
  badge?: 'pilot' | 'deprecated',
  defaultCode?: string,
  description?: string,
  fileName?: string, // only use if name !== file name
  folderName?: string, // only use if name !== file name and the link should point to a directory
  name: string,
  shadedCodeExample?: boolean,
  showSourceLink?: boolean,
|};

const buildSourceLinkPath = (componentName) => {
  const packageName = componentName === 'DatePicker' ? 'gestalt-datepicker' : 'gestalt';
  return `packages/${packageName}/src/${componentName}.js`;
};

const buildSourceLinkUrl = (componentName) =>
  ['https://github.com/pinterest/gestalt/blob/master', buildSourceLinkPath(componentName)].join(
    '/',
  );

export default function PageHeader({
  badge,
  defaultCode,
  description = '',
  fileName,
  folderName,
  name,
  shadedCodeExample,
  showSourceLink = true,
}: Props): Node {
  const sourcePathName = folderName ?? fileName ?? name;
  let sourceLink = buildSourceLinkUrl(sourcePathName);
  if (folderName) {
    // Strip the file extension if linking to a folder
    sourceLink = sourceLink.replace(/\.js$/, '');
  }

  return (
    <Box
      marginBottom={defaultCode ? 0 : 12}
      dangerouslySetInlineStyle={{
        __style: {
          paddingBottom: '1px',
        },
      }}
    >
      <Box marginBottom={2}>
        <Flex direction="row" gap={2} justifyContent="between" alignItems="baseline">
          <Heading>
            {name}{' '}
            {badge === 'pilot' ? (
              <Tooltip
                inline
                text={`This is the initial version of ${name}, and additional (non-breaking) functionality is planned for the future. Any feedback is greatly appreciated!`}
              >
                <Badge text="Pilot" position="top" />
              </Tooltip>
            ) : null}
            {badge === 'deprecated' ? (
              <Tooltip inline text="This component is deprecated and will be removed soon.">
                <Badge text="Deprecated" position="top" />
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
      </Box>

      {description && <Markdown text={description} />}

      {defaultCode && (
        <Box marginTop={8}>
          <MainSection.Card
            cardSize="lg"
            showCode={false}
            defaultCode={defaultCode}
            shaded={shadedCodeExample}
          />
        </Box>
      )}
    </Box>
  );
}
