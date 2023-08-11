// @flow strict
import { type Node } from 'react';
import { Box, TableOfContents } from 'gestalt';

export default function Example(): Node {
  const { hash } = window.location;

  return (
    <Box padding={8} display="flex" justifyContent="center">
      <TableOfContents title="Promotions">
        <TableOfContents.Item
          label="Active coupons"
          href="#active-coupons"
          active={hash === '#active-coupons'}
        />
        <TableOfContents.Item
          label="Active credits"
          href="#active-credits"
          active={hash === '#active-credits'}
        />
        <TableOfContents.Item
          label="Offer codes"
          href="#offer-codes"
          active={hash === '#offer-codes'}
        />
      </TableOfContents>
    </Box>
  );
}
