import { ReactNode } from 'react';
import { Box, TableOfContents } from 'gestalt';

export default function Example() {
  const { hash } = window.location;

  return (
    <Box display="flex" justifyContent="center" padding={8}>
      <TableOfContents title="Promotions">
        <TableOfContents.Item
          active={hash === '#active-coupons'}
          href="#active-coupons"
          label="Active coupons"
        />
        <TableOfContents.Item
          active={hash === '#active-credits'}
          href="#active-credits"
          label="Active credits"
        />
        <TableOfContents.Item
          active={hash === '#offer-codes'}
          href="#offer-codes"
          label="Offer codes"
        />
      </TableOfContents>
    </Box>
  );
}
