// @flow strict
import type { Node } from 'react';
import Example from '../components/Example.js';
import PageHeader from '../components/PageHeader.js';
import Page from '../components/Page.js';

export default function DocsPage(): Node {
  return (
    <Page title="Layouts guidelines">
      <PageHeader
        name="Layouts"
        description="A list of easy-to-copy layouts which have been battle tested."
        showSourceLink={false}
      />
      <Example
        description="Responsive &amp; RTL-friendly form layout."
        name="Form Layout"
        defaultCode={`
<Flex
  direction="column"
  gap={6}
  maxWidth={800}
  width="100%"
  wrap
>
  <Heading size="sm" accessibilityLevel={2}>
    Form Title
  </Heading>

  <TextField
    label="TextField 1"
    id="textfield1"
    onChange={() => {}}
    placeholder="Placeholder"
  />

  <Box
    // Using Box instead of Flex + 'gap' for proper vertical spacing when text fields wrap
    display="flex"
    marginStart={-3}
    marginEnd={-3}
    marginBottom={-3}
    marginTop={-3}
    wrap
  >
    <Box flex="grow" minWidth={250} paddingX={3} paddingY={3}>
      <TextField
        label="TextField 2"
        id="textfield2"
        onChange={() => {}}
        placeholder="Placeholder"
      />
    </Box>
    <Box flex="grow" minWidth={250} paddingX={3} paddingY={3}>
      <TextField
        label="TextField 3"
        id="textfield3"
        onChange={() => {}}
        placeholder="Placeholder"
      />
    </Box>
  </Box>

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

  <Flex gap={2} justifyContent="end" wrap>
    <Button text="Cancel" size="lg" />
    <Button text="Submit" color="red" size="lg" type="submit" />
  </Flex>
</Flex>
`}
      />
    </Page>
  );
}
