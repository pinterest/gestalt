// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Text } from 'gestalt';
import PropTable from './components/PropTable';
import Example from './components/Example';
import PageHeader from './components/PageHeader';
import CardPage from './components/CardPage';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Avatar"
    description="You can use an `Avatar` to represent a user. Every Avatar image has a subtle color wash."
  />
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
          'sm: 24px, md: 40px, lg: 72px. If size is undefined, Avatar will fill 100% of the parent container width',
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
    heading={false}
  />
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

const imageSrc = 'https://i.pinimg.com/avatars/long_1468294555_444.jpg';

card(
  <Example
    description={`
    There are 3 sizes you can choose for an \`Avatar\`. For certain designs you may need a container based size. More information on that option is below.
  `}
    name="Fixed Sizes"
    defaultCode={`
<Avatar
size="md"
src="${imageSrc}"
name="Long"
/>
`}
    scope={{ Avatar }}
  />
);

card(
  <Example
    description={`
    Avatars that are not given a \`size\` prop will be expand to fit to the width of their
    parent container. A common use case is to achieve column-based sizing.

    Resize the browser to see these Avatar change to match the width of the \`Column\` they
    have been placed in.
  `}
    name="Container Based Sizes"
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
  />
);

card(
  <Example
    description={`
    If there is no image source provided to the \`Avatar\`, the first character of
    the name provided will be used as a placeholder.
  `}
    name="Without an image"
    defaultCode={`
<Avatar
name="Long"
size="lg"
/>
  `}
    scope={{ Avatar }}
  />
);

const joeyImage =
  'https://i.pinimg.com/avatars/joeyzingarelli_1497376443_280.jpg';

card(
  <Example
    description={`
    When someone has a verified account, we can set the \`verified\` prop on it.
  `}
    name="Verified"
    defaultCode={`
<Avatar
name="Joey"
size="lg"
src="${joeyImage}"
verified
/>
  `}
    scope={{ Box, Avatar }}
  />
);

export default () => <CardPage cards={cards} />;
