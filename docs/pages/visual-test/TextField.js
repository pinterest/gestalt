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
      onRemove={() => {}}
      text={tag}
    />
  ));

  return (
    <Box color="default" display="inlineBlock" padding={1} width={600}>
      <Box padding={8}>
        <Flex direction="column" gap={{ column: 6, row: 0 }}>
          <Flex direction="column" gap={{ column: 2, row: 0 }}>
            <TextField
              helperText="Helper text"
              id="field0"
              label="small field"
              onChange={({ value }) => {
                setInput1Text(value);
              }}
              placeholder="Placeholder"
              size="sm"
              type="text"
              value={input1text}
            />
          </Flex>
          <Flex direction="column" gap={{ column: 2, row: 0 }}>
            <TextField
              helperText="Helper text"
              id="field1"
              label="medium field"
              onChange={({ value }) => {
                setInput2Text(value);
              }}
              placeholder="Placeholder"
              size="md"
              type="text"
              value={input2text}
            />
          </Flex>
          <Flex direction="column" gap={{ column: 2, row: 0 }}>
            <TextField
              helperText="Helper text"
              id="field2"
              label="large field"
              onChange={({ value }) => {
                setInput3Text(value);
              }}
              placeholder="Placeholder"
              size="lg"
              type="text"
              value={input3text}
            />
          </Flex>
          <Flex direction="column" gap={{ column: 4, row: 0 }}>
            <Heading size="300">Tags</Heading>
            <TextField
              errorMessage="This field has an error"
              helperText="Helper text"
              id="field2"
              label="small field"
              name="small"
              onChange={() => {}}
              size="sm"
              type="text"
              value={input3text}
            />
            <TextField
              errorMessage="This field has an error"
              helperText="Helper text"
              id="field2"
              label="medium field"
              name="medium"
              onChange={() => {}}
              size="md"
              type="text"
              value={input3text}
            />
            <TextField
              errorMessage="This field has an error"
              helperText="Helper text"
              id="field2"
              label="large field"
              name="large"
              onChange={() => {}}
              size="lg"
              type="text"
              value={input3text}
            />
          </Flex>
          <Flex direction="column" gap={{ column: 4, row: 0 }}>
            <Heading size="300">Tags</Heading>
            <TextField
              helperText="Helper text"
              id="field2"
              label="small field"
              name="small"
              onChange={() => {}}
              size="sm"
              tags={renderedTags}
              type="text"
              value={input3text}
            />
            <TextField
              helperText="Helper text"
              id="field3"
              label="medium field"
              name="medium"
              onChange={() => {}}
              size="md"
              tags={renderedTags}
              type="text"
              value={input3text}
            />
            <TextField
              helperText="Helper text"
              id="field1"
              label="large field"
              name="large"
              onChange={() => {}}
              size="lg"
              tags={renderedTags}
              type="text"
              value={input3text}
            />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
