// @flow strict
import React, { type Node } from 'react';
import { Badge, Box, Text, Tooltip, Heading, Link } from 'gestalt';
import Markdown from './Markdown.js';

type Props = {|
  name: string,
  description?: string,
  beta?: boolean,
  fileName?: string, // only use if name !== file name
  showSourceLink?: boolean,
|};

const gestaltPath = component => {
  if (component === 'DatePicker') {
    return `packages/gestalt-datepicker/src/${component}.js`;
  }
  return `packages/gestalt/src/${component}.js`;
};

const githubUrl = component =>
  [
    'https://github.com/pinterest/gestalt/blob/master',
    gestaltPath(component),
  ].join('/');

export default function ComponentHeader({
  beta,
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
          {beta ? (
            <Tooltip inline text="Do not use in production code">
              <Badge text="Beta" position="top" />
            </Tooltip>
          ) : null}
        </Heading>
        {showSourceLink && (
          <Text color="gray">
            <Link href={githubUrl(fileName || name)} inline>
              Source
            </Link>
          </Text>
        )}
      </Box>
      {description && <Markdown text={description} />}
    </Box>
  );
}
