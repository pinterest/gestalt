// @flow strict
import { type Node } from 'react';
import { Box, TableOfContents } from 'gestalt';

export default function Example(): Node {
  const { hash } = window.location;

  return (
    <Box padding={8} width="340px">
      <TableOfContents
        title="Task list"
        items={[
          {
            label: 'Build payload',
            href: '#1',
            active: hash === '#1',
          },
          {
            label: 'Identify required event types',
            href: '#2',
            active: hash === '#2',
            nestedItems: [
              {
                label: 'Set up event parameters',
                href: '#21',
                active: hash === '#21',
              },
              {
                label: 'Set up user_data object',
                href: '#22',
                active: hash === '#22',
              },
              {
                label: 'Set up custom_data object',
                href: '#23',
                active: hash === '#23',
              },
              {
                label: 'Set up event id',
                href: '#24',
                active: hash === '#24',
              },
            ],
          },
          {
            label: 'Test API request',
            href: '#3',
            active: hash === '#3',
          },
        ]}
      />
    </Box>
  );
}
