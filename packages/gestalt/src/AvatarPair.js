// @flow strict
import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar.js';
import Box from './Box.js';

type Props = {|
  collaborators: Array<{|
    name: string,
    src?: string,
  |}>,
  size?: 'md' | 'lg' | 'fit',
|};

const sizes = {
  md: 48,
  lg: 64,
};

export default function AvatarPair({ collaborators, size = 'fit' }: Props) {
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

AvatarPair.propTypes = {
  collaborators: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      src: PropTypes.string,
    })
  ).isRequired,
  size: PropTypes.oneOf(['md', 'lg', 'fit']),
};
