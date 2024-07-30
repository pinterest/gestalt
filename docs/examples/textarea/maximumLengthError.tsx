import { useState } from 'react';
import { Box, Flex, TextArea } from 'gestalt';

export default function TextAreaExample() {
  const [inputA, setInputA] = useState(
    'Before and after via side by side display of pale woman with auburn hair using concealer. The image shows her using a brush with concealer under her eyes.  The second image shows her with full makeup.',
  );
  const [inputB, setInputB] = useState(
    'Before and after via side by side display of pale woman with auburn hair using concealer. The image shows her using a brush with concealer under her eyes, second image shows her with full makeup and says new.',
  );

  const characterCount = 200;
  const errorAccessibilityLabel = 'Limit reached. You can only use 200 characters in this field.';

  return (
    <Box padding={8} width="100%">
      <Flex direction="column" gap={6} width="100%">
        <TextArea
          helperText="Describe your image with detail so visually impaired users can understand your Pin"
          id="maxLengthReached"
          label="Alt text"
          maxLength={{ characterCount, errorAccessibilityLabel }}
          onBlur={() => {}}
          onChange={({ value }) => setInputA(value)}
          onFocus={() => {}}
          placeholder="Enter the image alt text"
          rows={4}
          value={inputA}
        />
        <TextArea
          helperText="Describe your image with detail so visually impaired users can understand your Pin"
          id="maxLengthExceeded"
          label="Alt text"
          maxLength={{ characterCount, errorAccessibilityLabel }}
          onBlur={() => {}}
          onChange={({ value }) => setInputB(value)}
          onFocus={() => {}}
          placeholder="Enter the image alt text"
          rows={4}
          value={inputB}
        />
      </Flex>
    </Box>
  );
}
