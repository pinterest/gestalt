// @flow strict
import type { Node } from 'react';
import Example from '../components/Example.js';
import CardPage from '../components/CardPage.js';
import PageHeader from '../components/PageHeader.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="Layouts"
    description="A list of easy-to-copy layouts which have been battle tested."
    showSourceLink={false}
  />,
);

card(
  <Example
    description="Responsive &amp; RTL friendly form layout."
    name="Form Layout"
    defaultCode={`
<Box
  display="flex"
  marginStart={-3}
  marginEnd={-3}
  marginBottom={-3}
  marginTop={-3}
  wrap
  width="100%"
  direction="column"
  maxWidth={800}
>
  <Box flex="grow" paddingX={3} paddingY={3}>
    <Heading size="sm" accessibilityLevel={2}>
      Form Title
    </Heading>
  </Box>

  <Box flex="grow" paddingX={3} paddingY={3}>
    <TextField
      label="TextField 1"
      id="textfield1"
      onChange={() => {}}
      placeholder="Placeholder"
    />
  </Box>

  <Box flex="grow" paddingX={3} paddingY={3}>
    <Box
      display="flex"
      wrap
      marginStart={-3}
      marginEnd={-3}
      marginBottom={-3}
      marginTop={-3}
    >
      <Box flex="grow" paddingX={3} paddingY={3}>
        <TextField
          label="TextField 2"
          id="textfield2"
          onChange={() => {}}
          placeholder="Placeholder"
        />
      </Box>
      <Box flex="grow" paddingX={3} paddingY={3}>
        <TextField
          label="TextField 3"
          id="textfield3"
          onChange={() => {}}
          placeholder="Placeholder"
        />
      </Box>
    </Box>
  </Box>

  <Box flex="grow" paddingX={3} paddingY={3}>
    <SelectList
      label="SelectList"
      id="selectlist"
      options={[
        {
          value: 'belgium',
          label: 'Belgium',
        },
        {
          value: 'france',
          label: 'France',
        },
        {
          value: 'usa',
          label: 'USA',
        },
      ]}
      placeholder="Placeholder"
      onChange={() => {}}
    />
  </Box>

  <Box flex="grow" paddingX={3} paddingY={3}>
    <Box
      justifyContent="end"
      marginStart={-1}
      marginEnd={-1}
      marginTop={-1}
      marginBottom={-1}
      display="flex"
      wrap
    >
      <Box paddingX={1} paddingY={1}>
        <Button text="Cancel" size="lg" />
      </Box>
      <Box paddingX={1} paddingY={1}>
        <Button text="Submit" color="red" size="lg" type="submit" />
      </Box>
    </Box>
  </Box>
</Box>
`}
  />,
);

export default function Layouts(): Node {
  return <CardPage cards={cards} page="Layouts" />;
}
