// @flow strict
import { type Node } from 'react';
import { Box, TableOfContents } from 'gestalt';

export default function Example(): Node {
  const { hash } = window.location;

  return (
    <Box padding={8} display="flex" justifyContent="center">
      <TableOfContents title="Page Contents">
        <TableOfContents.Item label="Section 1" href="#section1" active={hash === '#section1'} />
        <TableOfContents.Item label="Section 2" href="#section2" active={hash === '#section2'}>
          <TableOfContents.Item
            label="Subsection 1"
            href="#subsection1"
            active={hash === '#subsection1'}
          />
          <TableOfContents.Item
            label="Subsection 2"
            href="#subsection2"
            active={hash === '#subsection2'}
          />
        </TableOfContents.Item>
        <TableOfContents.Item label="Section 3" href="#section3" active={hash === '#section3'} />
      </TableOfContents>
    </Box>
  );
}
