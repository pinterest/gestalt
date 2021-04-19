// @flow strict
import type { Node } from 'react';
import { Badge, Box, Flex, Heading, Text, Tooltip } from 'gestalt';
import Markdown from './Markdown.js';
import MainSection from './MainSection.js';
import trackButtonClick from './buttons/trackButtonClick.js';

type Props = {|
  name: string,
  description?: string,
  pilot?: boolean,
  fileName?: string, // only use if name !== file name
  showSourceLink?: boolean,
  defaultCode?: string,
  shadedCodeExample?: boolean,
|};

const gestaltPath = (component) => {
  const packageName = component === 'DatePicker' ? 'gestalt-datepicker' : 'gestalt';
  return `packages/${packageName}/src/${component}.js`;
};

const githubUrl = (component) =>
  ['https://github.com/pinterest/gestalt/blob/master', gestaltPath(component)].join('/');

export default function ComponentHeader({
  pilot,
  name,
  description = '',
  fileName,
  showSourceLink = true,
  defaultCode,
  shadedCodeExample,
}: Props): Node {
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
            {pilot ? (
              <Tooltip
                inline
                text={`This is the initial version of ${name}, and additional (non-breaking) functionality is planned for the future. Any feedback is greatly appreciated!`}
              >
                <Badge text="Pilot" position="top" />
              </Tooltip>
            ) : null}
          </Heading>
          {showSourceLink && (
            <a
              href={githubUrl(fileName ?? name)}
              onClick={() => trackButtonClick('View source on GitHub', fileName ?? name)}
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
