// @flow
import React from 'react';
import Box from '../../../src/Box/Box';
import Column from '../../../src/Column/Column';
import Text from '../../../src/Text/Text';
import Heading from '../../../src/Heading/Heading';
import Link from '../../../src/Link/Link';
import Markdown from './Markdown';

type Props = {|
  name: string,
  description: string,
|};

const githubSourceUrl = (component: string): string => {
  const file = component.replace(/\s+/g, '');
  return `https://github.com/pinterest/gestalt/blob/master/src/${file}/${file}.js`;
};

export default ({ name, description }: Props) => (
  <Box display="flex" direction="row">
    <Column span={6}>
      <Box display="flex" direction="row" alignItems="center" marginBottom={4}>
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
