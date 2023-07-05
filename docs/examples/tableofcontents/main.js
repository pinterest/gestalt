// @flow strict
import { type Node } from 'react';
import { Box, TableOfContents } from 'gestalt';

export default function Example(): Node {
  const { hash } = window.location;

  return (
    <Box padding={8} width="340px">
      <TableOfContents
        title="Page Contents"
        items={[
          {
            label: 'Section 1',
            href: '#section-1',
            active: hash === '#section-1',
          },
          {
            label: 'Section 2',
            href: '#section-2',
            active: hash === '#section-2',
            nestedItems: [
              {
                label: 'Subsection 1',
                href: '#subsection-1',
                active: hash === '#subsection-1',
              },
              {
                label: 'Subsection 2',
                href: '#subsection-2',
                active: hash === '#subsection-2',
              },
            ],
          },
          {
            label: 'Section 3',
            href: '#section-3',
            active: hash === '#section-3',
          },
        ]}
      />
    </Box>
  );
}
