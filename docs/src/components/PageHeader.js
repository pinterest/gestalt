// @flow strict
import React, { type Node } from 'react';
import { Badge, Box, Text, Tooltip, Heading, Link } from 'gestalt';
import Markdown from './Markdown.js';

type Props = {|
  name: string,
  description?: string,
  pilot?: boolean,
  fileName?: string, // only use if name !== file name
  showSourceLink?: boolean,
|};

const gestaltPath = (component) => {
  const packageName =
    component === 'DatePicker' ? 'gestalt-datepicker' : 'gestalt';
  return `packages/${packageName}/src/${component}.js`;
};

const githubUrl = (component) =>
  [
    'https://github.com/pinterest/gestalt/blob/master',
    gestaltPath(component),
  ].join('/');

export default function ComponentHeader({
  pilot,
  name,
  description = '',
  fileName,
  showSourceLink = true,
}: Props): Node {
  return (
    <Box marginBottom={6}>
      <Box marginBottom={4}>
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
            <Link href={githubUrl(fileName || name)} inline target="blank">
              View source on Github
            </Link>
          </Text>
        )}
      </Box>
      {description && <Markdown text={description} />}
    </Box>
  );
}
