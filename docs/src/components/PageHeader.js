// @flow
import React from 'react';
import { Box, Column, Text, Heading, Link } from 'gestalt';
import Markdown from './Markdown';

type Props = {|
  name: string,
  description: string,
|};

const githubSourceUrl = (component: string): string => {
  const file = component.replace(/\s+/g, '');
  return `https://github.com/pinterest/gestalt/blob/master/packages/gestalt/src/${file}/${file}.js`;
};

export default function PageHeader({ name, description = '' }: Props) {
  return (
    <Box display="flex" direction="row">
      <Column span={6}>
        <Box
          display="flex"
          direction="row"
          alignItems="center"
          marginBottom={4}
        >
          <Box>
            <Heading size="md">{name}</Heading>
            <Text size="sm">
              <Link href={githubSourceUrl(name)} target="blank">
                View source on GitHub
              </Link>
            </Text>
          </Box>
        </Box>
      </Column>
      <Column span={6}>
        <Markdown text={description} />
      </Column>
    </Box>
  );
}
