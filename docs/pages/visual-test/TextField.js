// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, Heading, Tag, TextField } from 'gestalt';

export default function TextFieldScreenshot(): Node {
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
            <Heading size="300">sm</Heading>
            <TextField
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
            <Heading size="300">md</Heading>
            <TextField
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
            <Heading size="300">lg</Heading>
            <TextField
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
              id="field3"
              onChange={() => {}}
              tags={renderedTags}
              type="text"
              size="md"
              value={input3text}
            />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
