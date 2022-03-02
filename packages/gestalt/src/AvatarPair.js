// @flow strict
import { type Node } from 'react';
import Avatar from './Avatar.js';
import Box from './Box.js';

type Props = {|
  /**
   * The users to be displayed.
   */
  collaborators: $ReadOnlyArray<{|
    name: string,
    src?: string,
  |}>,
  /**
   * md: 48px, lg: 64px. If size is `fit`, AvatarPair will fill 100% of the parent container width.
   */
  size?: 'md' | 'lg' | 'fit',
|};

const sizes = {
  md: 48,
  lg: 64,
};

/**
 * [AvatarPair](https://gestalt.pinterest.systems/avatarpair) is used to display two avatars in an overlapping grouping.
 */
export default function AvatarPair({ collaborators, size = 'fit' }: Props): Node {
  const width = size === 'fit' ? '100%' : sizes[size];
  return (
    <Box position="relative" width={width}>
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
