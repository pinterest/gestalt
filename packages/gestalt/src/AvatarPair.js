// @flow strict
import React, { type Node } from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar.js';
import Box from './Box.js';

type Props = {|
  collaborators: $ReadOnlyArray<{|
    name: string,
    src?: string,
  |}>,
  size?: 'md' | 'lg' | 'fit',
|};

const sizes = {
  md: 48,
  lg: 64,
};

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

AvatarPair.propTypes = {
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  collaborators: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      src: PropTypes.string,
    }),
  ).isRequired,
  // $FlowFixMe[signature-verification-failure] flow 0.135.0 upgrade
  size: PropTypes.oneOf(['md', 'lg', 'fit']),
};
