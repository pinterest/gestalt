// @flow strict
import React from 'react';
import { Badge, Box, Text, Tooltip, Heading, Link } from 'gestalt';
import Markdown from './Markdown.js';

type Props = {|
  name: string,
  description?: string,
  beta?: boolean,
|};

const gestaltPath = component => `packages/gestalt/src/${component}.js`;

const githubUrl = component =>
  [
    'https://github.com/pinterest/gestalt/blob/master',
    gestaltPath(component),
  ].join('/');

export default function ComponentHeader({
  beta,
  name,
  description = '',
}: Props) {
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
        <Text color="gray">
          <Link href={githubUrl(name)} inline>
            Source
          </Link>
        </Text>
      </Box>
      {description && <Markdown text={description} size="lg" />}
    </Box>
  );
}
