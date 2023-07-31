// @flow strict
import { type Node } from 'react';
import { Box, TableOfContents } from 'gestalt';

export default function Example(): Node {
  const { hash } = window.location;

  return (
    <Box padding={8} width="340px">
      <TableOfContents
        title="Promotions"
        items={[
          {
            label: 'Active coupons',
            href: '#active-coupons',
            active: hash === '#active-coupons',
          },
          {
            label: 'Active credits',
            href: '#active-credits',
            active: hash === '#active-credits',
          },
          {
            label: 'Offer codes',
            href: '#offer-codes',
            active: hash === '#offer-codes',
          },
        ]}
      />
    </Box>
  );
}
