// @flow
import * as React from 'react';
import { Box, Heading } from 'gestalt';
import Markdown from './Markdown';

type Props = {|
  children?: React.Node,
  description?: string,
  heading?: boolean,
  name: string,
  stacked?: boolean,
|};

export default function Card({
  children,
  description = '',
  heading = true,
  name,
  stacked = false,
}: Props) {
  return (
    <Box>
      {heading && <Heading size="xs">{name}</Heading>}
      <Box
        marginLeft={-2}
        marginRight={-2}
        display="flex"
        direction={stacked ? 'column' : 'row'}
      >
        <Box paddingX={2} column={12}>
          <Markdown text={description} />
          {children}
        </Box>
      </Box>
    </Box>
  );
}
