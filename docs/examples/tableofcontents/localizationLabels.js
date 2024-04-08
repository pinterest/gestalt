// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, DefaultLabelProvider, TableOfContents } from 'gestalt';

export default function Example(): ReactNode {
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
      <Box display="flex" justifyContent="center" padding={8}>
        <TableOfContents title="Beförderungen">
          <TableOfContents.Item
            active={hash === '#active-coupons'}
            href="#active-coupons"
            label="Aktive Gutscheine"
          />
          <TableOfContents.Item
            active={hash === '#active-credits'}
            href="#active-credits"
            label="Aktive Kredite"
          />
          <TableOfContents.Item
            active={hash === '#offer-codes'}
            href="#offer-codes"
            label="Angebot Codes"
          />
        </TableOfContents>
      </Box>
    </DefaultLabelProvider>
  );
}
