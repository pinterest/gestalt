// @flow
import * as React from 'react';
import PropTable from './components/PropTable.js';
import Example from './components/Example.js';
import PageHeader from './components/PageHeader.js';

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
        name: 'outline',
        type: 'boolean',
        defaultValue: false,
        description: `Adds a white border around Avatar so it's visible when displayed on other images`,
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
      {
        name: 'icon',
        type: '"check-circle" | "pinterest"',
        defaultValue: 'check-circle',
        description: 'This is the icon shown only when "verified=true"',
      },
    ]}
  />
);

card(
  <Example
    description={`
    There are 3 sizes you can choose for an \`Avatar\`. For certain designs you may need a container-based size. More information on that option is below.
  `}
    name="Fixed Sizes"
    defaultCode={`
<Avatar
  size="md"
  src="https://i.ibb.co/ZfCZrY8/keerthi.jpg"
  name="Keerthi"
/>
`}
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
    <Avatar name="Keerthi" src="https://i.ibb.co/ZfCZrY8/keerthi.jpg" />
  </Box>
</Box>
  `}
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
  name="Keerthi"
  size="lg"
/>
  `}
  />
);

card(
  <Example
    description={`
    When someone has a verified account, we can set the \`verified\` prop on it.
  `}
    name="Verified"
    defaultCode={`
<Avatar
  name="Shanice"
  size="lg"
  src="https://i.ibb.co/7tGKGvb/shanice.jpg"
  verified
/>
  `}
  />
);

card(
  <Example
    description={`
    We can also changed the \`verified\` icon to the Pinterest logo by setting the
    \`icon\` prop to \`pinterest\`.
  `}
    name="Verified"
    defaultCode={`
<Avatar
  icon="pinterest"
  name="Shanice"
  size="lg"
  src="https://i.ibb.co/7tGKGvb/shanice.jpg"
  verified
/>
  `}
  />
);
export default cards;
