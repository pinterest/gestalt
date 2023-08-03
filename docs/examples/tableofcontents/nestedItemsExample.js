// @flow strict
import { type Node } from 'react';
import { Box, TableOfContents } from 'gestalt';

export default function Example(): Node {
  const { hash } = window.location;

  return (
    <Box padding={8} width="340px">
      <TableOfContents title="Profile">
        <TableOfContents.Item
          label="Business information"
          href="#business-information"
          active={hash === '#business-information'}
        >
          <TableOfContents.Item
            label="Business contact"
            href="#business-contact"
            active={hash === '#business-contact'}
          >
            <TableOfContents.Item
              label="Business name"
              href="#business-name"
              active={hash === '#business-name'}
            />
          </TableOfContents.Item>
        </TableOfContents.Item>
        <TableOfContents.Item
          label="Payment information"
          href="#Payment-information"
          active={hash === '#Payment-information'}
        />
      </TableOfContents>
    </Box>
  );
}
