import { useState } from 'react';
import { Box, Flex, TextArea } from 'gestalt';

export default function TextAreaExample() {
  const [valueA, setValueA] = useState(
    'Before and after via side by side display of pale woman with auburn hair using concealer. The image shows her using a brush with concealer under her eyes.  The second image shows her with full makeup.',
  );
  const [valueB, setValueB] = useState(
    'Before and after via side by side display of pale woman with auburn hair using concealer. The image shows her using a brush with concealer under her eyes, second image shows her with full makeup and says new.',
  );

  const characterCount = 200;
  const errorAccessibilityLabel = 'Limit reached. You can only use 200 characters in this field.';

  return (
    <Box display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" gap={12}>
        <TextArea
          helperText="Describe your image with detail so visually impaired users can understand your Pin"
          id="maxLengthReached"
          label="Alt text"
          maxLength={{ characterCount, errorAccessibilityLabel }}
          onBlur={() => {}}
          onChange={({ value }) => setValueA(value)}
          onFocus={() => {}}
          placeholder="Enter the image alt text"
          rows={4}
          value={valueA}
        />
        <TextArea
          helperText="Describe your image with detail so visually impaired users can understand your Pin"
          id="maxLengthExceeded"
          label="Alt text"
          maxLength={{ characterCount, errorAccessibilityLabel }}
          onBlur={() => {}}
          onChange={({ value }) => setValueB(value)}
          onFocus={() => {}}
          placeholder="Enter the image alt text"
          rows={4}
          value={valueB}
        />
      </Flex>
    </Box>
  );
}
