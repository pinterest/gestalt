// @flow
import React from 'react';
import { Box, Text, Heading, Link } from 'gestalt';
import Markdown from './Markdown.js';

type Props = {|
  name: string,
  description?: string,
|};

const gestaltPath = component => `packages/gestalt/src/${component}.js`;

const githubUrl = component =>
  [
    'https://github.com/pinterest/gestalt/blob/master',
    gestaltPath(component),
  ].join('/');

export default function ComponentHeader({ name, description = '' }: Props) {
  return (
    <Box marginBottom={6}>
      <Box marginBottom={4}>
        <Heading size="md">{name}</Heading>
        <Text leading="tall" color="gray">
          <Link href={githubUrl(name)} inline>
            Source
          </Link>
        </Text>
      </Box>
      {description && <Markdown text={description} size="lg" />}
    </Box>
  );
}
