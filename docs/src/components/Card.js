// @flow strict
import * as React from 'react';
import { Box, Heading } from 'gestalt';
import Markdown from './Markdown.js';

type Props = {|
  children?: React.Node,
  description?: string,
  heading?: boolean,
  id: ?string,
  name: string,
  stacked?: boolean,
|};

export default function Card({
  children,
  description,
  heading = true,
  id,
  name,
  stacked = false,
}: Props) {
  return (
    <Box id={id}>
      {heading && <Heading size="md">{name}</Heading>}
      <Box
        marginLeft={-2}
        marginRight={-2}
        display="flex"
        direction={stacked ? 'column' : 'row'}
      >
        <Box marginTop={1} paddingX={2} column={12}>
          {description && <Markdown text={description} />}
          {children}
        </Box>
      </Box>
    </Box>
  );
}
