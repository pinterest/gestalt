// @flow strict
import { type Node } from 'react';
import { Box, DefaultLabelProvider, TableOfContents } from 'gestalt';

export default function Example(): Node {
  const { hash } = window.location;

  return (
    <DefaultLabelProvider
      // $FlowExpectedError[incompatible-type] For demostration purposes
      labels={{
        TableOfContents: {
          accessibilityLabel: 'Table of contents',
        },
      }}
    >
      <Box padding={8} display="flex" justifyContent="center">
        <TableOfContents title="Beförderungen">
          <TableOfContents.Item
            label="Aktive Gutscheine"
            href="#active-coupons"
            active={hash === '#active-coupons'}
          />
          <TableOfContents.Item
            label="Aktive Kredite"
            href="#active-credits"
            active={hash === '#active-credits'}
          />
          <TableOfContents.Item
            label="Angebot Codes"
            href="#offer-codes"
            active={hash === '#offer-codes'}
          />
        </TableOfContents>
      </Box>
    </DefaultLabelProvider>
  );
}
