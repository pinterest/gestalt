import { Box, TableOfContents } from 'gestalt';

export default function Example() {
  const { hash } = window.location;

  return (
    <Box display="flex" justifyContent="center" padding={8}>
      <TableOfContents title="Page Contents">
        <TableOfContents.Item active={hash === '#section1'} href="#section1" label="Section 1" />
        <TableOfContents.Item active={hash === '#section2'} href="#section2" label="Section 2">
          <TableOfContents.Item
            active={hash === '#subsection1'}
            href="#subsection1"
            label="Subsection 1"
          />
          <TableOfContents.Item
            active={hash === '#subsection2'}
            href="#subsection2"
            label="Subsection 2"
          />
        </TableOfContents.Item>
        <TableOfContents.Item active={hash === '#section3'} href="#section3" label="Section 3" />
      </TableOfContents>
    </Box>
  );
}
