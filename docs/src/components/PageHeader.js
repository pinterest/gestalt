// @flow strict
import React, { type Node } from 'react';
import { Badge, Box, Flex, Heading, Link, Text, Tooltip } from 'gestalt';
import Markdown from './Markdown.js';
import MainSection from './MainSection.js';

type Props = {|
  name: string,
  description?: string,
  pilot?: boolean,
  fileName?: string, // only use if name !== file name
  showSourceLink?: boolean,
  defaultCode?: string,
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
}: Props): Node {
  return (
    <Box marginBottom={6}>
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
            <Text color="gray">
              <Link href={githubUrl(fileName ?? name)} inline target="blank">
                View source on GitHub
              </Link>
            </Text>
          )}
        </Flex>
      </Box>
      {description && <Markdown text={description} />}
      {defaultCode && (
        <Box marginTop={8}>
          <MainSection.Card cardSize="lg" showCode={false} defaultCode={defaultCode} />
        </Box>
      )}
    </Box>
  );
}
