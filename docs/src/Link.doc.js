// @flow
import * as React from 'react';
import { Box, Link, Text } from 'gestalt';
import PropTable from './components/PropTable';
import Example from './components/Example';
import PageHeader from './components/PageHeader';
import CardPage from './components/CardPage';

const cards = [];
const card = c => cards.push(c);

card(
  <PageHeader
    name="Link"
    description="The Link component allows you to show links on the page, open them in a new window and change the color."
  />
);

card(
  <PropTable
    props={[
      {
        name: 'children',
        type: 'React.Node',
      },
      {
        name: 'href',
        type: 'string',
      },
      {
        name: 'inline',
        type: 'boolean',
        defaultValue: false,
      },
      {
        name: 'onClick',
        type: '({ event: SyntheticMouseEvent<> }) => void',
      },
      {
        name: 'target',
        type: `"null" | "self" | "blank"`,
        defaultValue: 'null',
      },
    ]}
    heading={false}
  />
);

card(
  <Example
    description={`
    You should wrap \`Link\` components inside of a \`Text\` component to get the correct font & underline color.
  `}
    name="Example"
    defaultCode={`
<Box>
<Link href="https://pinterest.com">
  <Box padding={2}>
    <Text bold>Pinterest.com</Text>
  </Box>
</Link>
<Box color="darkGray">
  <Text color="white" bold>
    <Link href="https://pinterest.com">
      <Box padding={2}>
        Pinterest.com
      </Box>
    </Link>
  </Text>
</Box>
</Box>
`}
    scope={{ Box, Link, Text }}
  />
);

card(
  <Example
    description={`
    \`href\` is optional on \`Link\` so you can use a custom \`Link\` (e.g. for \`react-router\` support).
  `}
    name="Example: optional href"
    defaultCode={`
<Link>
<Box padding={2}>
  <a href="https://pinterest.com" style={{ textDecoration: 'none' }}>
    <Text bold>Pinterest.com</Text>
  </a>
</Box>
</Link>
`}
    scope={{ Box, Link, Text }}
  />
);

card(
  <Example
    description={`
    When providing the content for the link, avoid phrases like "click here" or "go to".
  `}
    name="Accessibility"
    defaultCode={`
<Box>
<Heading size="sm">
  Bad ❌
</Heading>
<Text>
  For more information,{' '}
  <Text inline bold>
    <Link inline href="https://pinterest.com">
      click here
    </Link>
  </Text>.
</Text>
<Box paddingY={4}>
  <Heading size="sm">
    Good ✅
  </Heading>
  <Text>
    Visit
    {' '}
    <Text inline bold>
      <Link inline href="https://pinterest.com">
        Pinterest.com
      </Link>
    </Text>
    {' '}
    for more information.
  </Text>
</Box>
</Box>
`}
    scope={{ Box, Link, Text }}
  />
);

export default () => <CardPage cards={cards} />;
