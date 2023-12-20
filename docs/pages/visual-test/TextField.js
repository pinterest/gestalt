// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Flex, Heading, Tag, TextField } from 'gestalt';

export default function TextFieldScreenshot(): ReactNode {
  const [input1text, setInput1Text] = useState('');
  const [input2text, setInput2Text] = useState('');
  const [input3text, setInput3Text] = useState('');

  const cities = ['Aberdeen', 'Spartanburg', 'Spokane', 'Springdale'];

  const renderedTags = cities.map((tag) => (
    <Tag
      key={tag}
      accessibilityRemoveIconLabel={`Remove ${tag} tag`}
      text={tag}
      onRemove={() => {}}
    />
  ));

  return (
    <Box color="default" display="inlineBlock" padding={1} width={600}>
      <Box padding={8}>
        <Flex direction="column" gap={{ column: 6, row: 0 }}>
          <Flex direction="column" gap={{ column: 2, row: 0 }}>
            <TextField
              label="small field"
              helperText="Helper text"
              id="field0"
              onChange={({ value }) => {
                setInput1Text(value);
              }}
              placeholder="Placeholder"
              type="text"
              size="sm"
              value={input1text}
            />
          </Flex>
          <Flex direction="column" gap={{ column: 2, row: 0 }}>
            <TextField
              label="medium field"
              helperText="Helper text"
              id="field1"
              onChange={({ value }) => {
                setInput2Text(value);
              }}
              placeholder="Placeholder"
              type="text"
              size="md"
              value={input2text}
            />
          </Flex>
          <Flex direction="column" gap={{ column: 2, row: 0 }}>
            <TextField
              label="large field"
              helperText="Helper text"
              id="field2"
              onChange={({ value }) => {
                setInput3Text(value);
              }}
              placeholder="Placeholder"
              type="text"
              size="lg"
              value={input3text}
            />
          </Flex>
          <Flex direction="column" gap={{ column: 2, row: 0 }}>
            <Heading size="300">Tags</Heading>
            <TextField
              name="small"
              label="small field"
              helperText="Helper text"
              id="field2"
              errorMessage="This field has an error"
              onChange={() => {}}
              type="text"
              size="sm"
              value={input3text}
            />
            <TextField
              name="medium"
              label="medium field"
              helperText="Helper text"
              id="field2"
              errorMessage="This field has an error"
              onChange={() => {}}
              type="text"
              size="md"
              value={input3text}
            />
            <TextField
              name="large"
              label="large field"
              helperText="Helper text"
              id="field2"
              errorMessage="This field has an error"
              onChange={() => {}}
              type="text"
              size="md"
              value={input3text}
            />
          </Flex>
          <Flex direction="column" gap={{ column: 2, row: 0 }}>
            <Heading size="300">Tags</Heading>
            <TextField
              name="small"
              label="small field"
              helperText="Helper text"
              id="field2"
              onChange={() => {}}
              tags={renderedTags}
              type="text"
              size="sm"
              value={input3text}
            />
            <TextField
              name="medium"
              label="medium field"
              id="field3"
              onChange={() => {}}
              tags={renderedTags}
              helperText="Helper text"
              type="text"
              size="md"
              value={input3text}
            />
            <TextField
              name="large"
              label="large field"
              helperText="Helper text"
              id="field1"
              onChange={() => {}}
              tags={renderedTags}
              type="text"
              size="lg"
              value={input3text}
            />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
