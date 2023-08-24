// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, TextArea } from 'gestalt';

export default function TextAreaExample(): Node {
  const [valueA, setValueA] = useState(
    'Before and after via side by side display of pale woman with auburn hair using concealer. The image shows her using a brush with concealer under her eyes.  The second image shows her with full makeup.',
  );
  const [valueB, setValueB] = useState(
    'Before and after via side by side display of pale woman with auburn hair using concealer. The image shows her using a brush with concealer under her eyes, second image shows her with full makeup and says new.',
  );

  const characterCount = 200;
  const errorAccessibilityLabel = 'Limit reached. You can only use 200 characters in this field.';

  return (
    <Box padding={8} height="100%" display="flex" justifyContent="center">
      <Flex direction="column" gap={12}>
        <TextArea
          id="maxLengthReached"
          label="Alt text"
          helperText="Describe your image with detail so visually impaired users can understand your Pin"
          onChange={({ value }) => setValueA(value)}
          placeholder="Enter the image alt text"
          value={valueA}
          onBlur={() => {}}
          onFocus={() => {}}
          rows={4}
          maxLength={{ characterCount, errorAccessibilityLabel }}
        />
        <TextArea
          id="maxLengthExceeded"
          label="Alt text"
          helperText="Describe your image with detail so visually impaired users can understand your Pin"
          onChange={({ value }) => setValueB(value)}
          placeholder="Enter the image alt text"
          value={valueB}
          onBlur={() => {}}
          onFocus={() => {}}
          rows={4}
          maxLength={{ characterCount, errorAccessibilityLabel }}
        />
      </Flex>
    </Box>
  );
}
