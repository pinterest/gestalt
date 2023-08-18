// @flow strict
import { type Node } from 'react';
import { Box, TableOfContents } from 'gestalt';

export default function Example(): Node {
  const { hash } = window.location;

  return (
    <Box padding={8} display="flex" justifyContent="center">
      <TableOfContents title="Title">
        <TableOfContents.Item label="Level 1" href="#level-1" active={hash === '#level-1'}>
          <TableOfContents.Item label="Level 2" href="#level-2" active={hash === '#level-2'}>
            <TableOfContents.Item label="Level 3" href="#level-3" active={hash === '#level-3'}>
              <TableOfContents.Item label="Level 4" href="#level-4" active={hash === '#level-4'}>
                <TableOfContents.Item
                  label="Level 5"
                  href="#level-5"
                  active={hash === '#level-5'}
                />
              </TableOfContents.Item>
            </TableOfContents.Item>
          </TableOfContents.Item>
        </TableOfContents.Item>
      </TableOfContents>
    </Box>
  );
}
