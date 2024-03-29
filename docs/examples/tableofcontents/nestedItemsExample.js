// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, TableOfContents } from 'gestalt';

export default function Example(): ReactNode {
  const { hash } = window.location;

  return (
    <Box display="flex" justifyContent="center" padding={8}>
      <TableOfContents title="Title">
        <TableOfContents.Item active={hash === '#level-1'} href="#level-1" label="Level 1">
          <TableOfContents.Item active={hash === '#level-2'} href="#level-2" label="Level 2">
            <TableOfContents.Item active={hash === '#level-3'} href="#level-3" label="Level 3">
              <TableOfContents.Item active={hash === '#level-4'} href="#level-4" label="Level 4">
                <TableOfContents.Item
                  active={hash === '#level-5'}
                  href="#level-5"
                  label="Level 5"
                />
              </TableOfContents.Item>
            </TableOfContents.Item>
          </TableOfContents.Item>
        </TableOfContents.Item>
      </TableOfContents>
    </Box>
  );
}
