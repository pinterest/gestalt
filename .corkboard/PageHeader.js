import React from 'react';
import Box from '../src/Box/Box';
import Column from '../src/Column/Column';
import Text from '../src/Text/Text';
import Heading from '../src/Heading/Heading';
import Link from '../src/Link/Link';
import Markdown from './Markdown';

const githubSourceUrl = component => {
  const file = component.replace(/\s+/g, '');
  return `https://github.com/pinterest/gestalt/blob/master/src/${file}/${file}.js`;
};

export default ({ name, description }) => (
  <Box display="flex" direction="column">
    <Box
      display="flex"
      direction="column"
      justifyContent="between"
      alignItems="baseline"
      marginBottom={2}
    >
      <Heading size="md">{name}</Heading>

      <Text color="gray">
        <Link href={githubSourceUrl(name)} target="blank">
          View source on GitHub
        </Link>
      </Text>
    </Box>

    <Box marginTop={2}>
      <Column span={9}>
        <Markdown text={description} />
      </Column>
    </Box>
  </Box>
);
