// @flow strict
import { type Node } from 'react';
import { Box, TableOfContents } from 'gestalt';

export default function Example(): Node {
  const { hash } = window.location;

  return (
    <Box padding={8} width="340px">
      <TableOfContents
        items={[
          {
            label: 'Business information',
            href: '#business-information',
            active: hash === '#business-information',
            nestedItems: [
              {
                label: 'Business name',
                href: '#business-name',
                active: hash === '#business-name',
              },
              {
                label: 'Business contact',
                href: '#business-contact',
                active: hash === '#business-contact',
              },
            ],
          },
          {
            label: 'Payment information',
            href: '#payment-information',
            active: hash === '#payment-information',
          },
        ]}
      />
    </Box>
  );
}
