import { useState } from 'react';
import { Box, Flex, Label, NumberField, Switch, Text, TextArea } from 'gestalt';

export default function Example() {
  const [input, setInput] = useState('');
  const [rows, setRows] = useState(4);
  const [display, setDisplay] = useState(false);

  const content =
    'Nam consequat vehicula est, et congue turpis tempus quis. Vivamus sed iaculis elit, eu pharetra velit. Proin vitae arcu ut ligula sodales euismod at at sem. Nulla sit amet rutrum turpis. Ut fermentum congue hendrerit. Quisque lectus nisl, dignissim a eros id, ultrices varius libero. Nulla ultrices purus a nibh consectetur hendrerit. Proin a finibus est. Phasellus pharetra volutpat risus, at placerat libero venenatis in. Nunc id lacus posuere, fermentum dolor eu, ornare tellus. Sed quis tincidunt lorem, ut sollicitudin nunc. Cras cursus eget dolor at rutrum. Aliquam eu congue massa. Praesent vehicula ipsum tortor, vitae commodo odio sollicitudin non. Phasellus eget odio et nulla pretium vulputate. Donec vitae sem ac urna malesuada elementum.';

  return (
    <Box padding={8} width="100%">
      <Flex direction="column" gap={6} width="100%">
        <Flex gap={2}>
          <Switch id="display" onChange={() => setDisplay((value) => !value)} switched={display} />
          <Box flex="grow" paddingX={2}>
            <Label htmlFor="display">
              <Text>{display ? 'Show placeholder' : 'Show content'}</Text>
            </Label>
          </Box>
        </Flex>

        <TextArea
          id="rows1"
          label="Label 1"
          onChange={({ value }) => setInput(value)}
          placeholder="This textarea has 1 rows"
          rows={1}
          value={display ? content : input}
        />
        <TextArea
          id="rows2"
          label="Label 2"
          onChange={({ value }) => setInput(value)}
          placeholder="This textarea has 2 rows"
          rows={2}
          value={display ? content : input}
        />
        <TextArea
          id="rows3"
          label="Label 3"
          onChange={({ value }) => setInput(value)}
          placeholder="This textarea has 3 rows"
          rows={3}
          value={display ? content : input}
        />
        <Flex gap={4} width="100%">
          <NumberField
            id="numberfield rows"
            label="Number of Rows"
            min={2}
            onChange={({ value }) => setRows(value ?? 2)}
            value={rows}
          />
          <TextArea
            id="dynamix rows"
            label="Label"
            onChange={({ value }) => setInput(value)}
            placeholder={`This textarea has ${rows} rows`}
            rows={rows}
            value={display ? content : input}
          />
        </Flex>
      </Flex>
    </Box>
  );
}
