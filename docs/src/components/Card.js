// @flow strict
import React from 'react';
import { Box, Heading, Icon, Link, Row } from 'gestalt';
import slugify from 'slugify';
import Markdown from './Markdown.js';

type Props = {|
  children?: React.Node,
  description?: string,
  id: ?string,
  name: string,
  stacked?: boolean,
|};

export default function Card({
  children,
  description,
  id,
  name,
  stacked = false,
}: Props) {
  const slugifiedId = id ?? slugify(name);
  return (
    <Box
      id={slugifiedId}
      dangerouslySetInlineStyle={{
        __style: {
          scrollMarginTop: 60,
        },
      }}
    >
      <Heading size="md">
        <Row display="flex" alignItems="baseline" gap={1}>
          {name}
          <Link href={`#${slugifiedId}`} inline>
            <Icon icon="link" accessibilityLabel="" size={12} />
          </Link>
        </Row>
      </Heading>
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
