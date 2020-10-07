// @flow strict
import React from 'react';
import { Box, Heading, Icon, Link, Row } from 'gestalt';
import slugify from 'slugify';
import Markdown from './Markdown.js';

type Props = {|
  children?: React.Node,
  description?: string,
  headingSize: 'sm' | 'md',
  id: ?string,
  name: string,
  stacked?: boolean,
  showHeading?: boolean,
|};

export default function Card({
  children,
  description,
  headingSize = 'md',
  id,
  name,
  stacked = false,
  showHeading = true,
}: Props) {
  const slugifiedId = id ?? slugify(name);
  return (
    <>
      {showHeading && (
        <Heading size={headingSize}>
          <Box
            dangerouslySetInlineStyle={{
              __style: {
                scrollMarginTop: 60,
              },
            }}
            id={slugifiedId}
            data-anchor
          >
            <Row display="flex" alignItems="baseline" gap={1}>
              {name}
              <Link href={`#${slugifiedId}`} inline>
                <Icon icon="link" accessibilityLabel="" size={12} />
              </Link>
            </Row>
          </Box>
        </Heading>
      )}
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
    </>
  );
}
