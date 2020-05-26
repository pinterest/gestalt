// @flow strict
import * as React from 'react';
import Avatar from './Avatar.js';
import Box from './Box.js';

type Props = {|
  collaborators: Array<{|
    name: string,
    src?: string,
  |}>,
|};

export default function AvatarPair({ collaborators }: Props) {
  return (
    <Box position="relative">
      <Box dangerouslySetInlineStyle={{ __style: { paddingBottom: '100%' } }} />
      {(collaborators || []).slice(0, 2).map(({ name, src }, index) => (
        <Box
          key={`${name}-${index}`}
          position="absolute"
          height="75%"
          width="75%"
          dangerouslySetInlineStyle={{
            __style: {
              left: index === 0 ? 0 : '25%',
              top: index === 0 ? 0 : '25%',
            },
          }}
        >
          <Avatar src={src} name={name} outline />
        </Box>
      ))}
    </Box>
  );
}
