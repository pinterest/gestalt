// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from './Avatar';
import Box from '../Box/Box';
import Text from '../Text/Text';
import { ns, card, md, PropTable, Example } from '../../docs/src/cards';

ns(
  'Avatar',
  'You can use an `Avatar` to represent a user. Every Avatar image has a subtle color wash.'
);

card(
  <PropTable
    props={[
      {
        name: 'name',
        type: 'string',
        required: true,
      },
      {
        name: 'size',
        type: `"sm" | "md" | "lg"`,
        description:
          "Without passing in a size, the Avatar will fill to 100% of the width of its' parent container",
      },
      {
        name: 'src',
        type: 'string',
      },
      {
        name: 'verified',
        type: 'boolean',
        defaultValue: false,
      },
    ]}
  />,
  { heading: false }
);

const sizes = ['sm', 'md', 'lg'];

type AvatarExProps = {
  size: 'sm' | 'md' | 'lg',
  src: string,
};

function AvatarEx(props: AvatarExProps) {
  const name = 'Long';
  const { size, src } = props;
  return (
    <Box padding={1}>
      <Box marginBottom={1}>
        <Text bold align="center">
          {size}
        </Text>
      </Box>
      <Avatar name={name} size={size} src={src} />
    </Box>
  );
}

AvatarEx.propTypes = {
  size: PropTypes.oneOf(sizes),
  src: PropTypes.string,
};

const imageSrc =
  'https://s-media-cache-ak0.pinimg.com/avatars/long_1468294555_444.jpg';

card(
  'Fixed Sizes',
  md`
    There are 3 sizes you can choose for an \`Avatar\`. For certain designs you may need a container based size. More information on that option is below.
  `,
  <Example
    defaultCode={`
<Avatar
  size="md"
  src="${imageSrc}"
  name="Long"
/>
`}
    scope={{ Avatar }}
  />,
  { stacked: true }
);

card(
  'Container Based Sizes',
  md`
    Avatars that are not given a \`size\` prop will be expand to fit to the width of their
    parent container. A common use case is to achieve column-based sizing.

    Resize the browser to see these Avatar change to match the width of the \`Column\` they
    have been placed in.
  `,
  <Example
    defaultCode={`
<Box display="flex" direction="row">
  <Box width={40}>
    <Avatar name="Julia" />
  </Box>
  <Box column={2}>
    <Avatar name="Julia" />
  </Box>
  <Box column={4}>
    <Avatar name="Long" src="${imageSrc}" />
  </Box>
</Box>
    `}
    scope={{ Box, Avatar }}
  />,
  { stacked: true }
);

card(
  'Without an image',
  md`
    If there is no image source provided to the \`Avatar\`, the first character of
    the name provided will be used as a placeholder.
  `,
  <Example
    defaultCode={`
<Avatar
  name="Long"
  size="lg"
/>
    `}
    scope={{ Avatar }}
  />,
  { stacked: true }
);

const joeyImage =
  'https://i.pinimg.com/avatars/joeyzingarelli_1497376443_280.jpg';

card(
  'Verified',
  md`
    When someone has a verified account, we can set the \`verified\` prop on it.
  `,
  <Example
    defaultCode={`
<Avatar
  name="Joey"
  size="lg"
  src="${joeyImage}"
  verified
/>
    `}
    scope={{ Box, Avatar }}
  />,
  { stacked: true }
);
