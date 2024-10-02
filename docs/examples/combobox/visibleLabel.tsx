import { useState } from 'react';
import { Box, ComboBox } from 'gestalt';

export default function Example() {
  const CATEGORIES = [
    'All Categories',
    'Food and drinks',
    'Beauty',
    'Home decor',
    'Fashion',
    'Travel',
    'Art',
    'Quotes',
    'Entertainment',
    'Entertainment',
    'DIY and crafts',
    'Health',
    'Wedding',
    'Event planning',
    'Gardening',
    'Parenting',
    'Vehicles',
    'Design',
    'Sport',
    'Electronics',
    'Animals',
    'Finance',
    'Architecture',
  ];

  const options = CATEGORIES.map((category, index) => ({
    label: category,
    value: `value${index}`,
  }));

  const [errorMessage, setErrorMessage] = useState<string | null | undefined>();

  const handleOnBlur = ({
    value,
  }: {
    event: React.FocusEvent<HTMLInputElement> | React.SyntheticEvent<HTMLInputElement>;
    value: string;
  }) => {
    if (value !== '' && !CATEGORIES.includes(value))
      setErrorMessage('Please, select a valid option');
  };

  // @ts-expect-error - TS2554 - Expected 1 arguments, but got 0.
  const resetErrorMessage = errorMessage ? () => setErrorMessage() : () => {};

  return (
    <Box padding={8} width="100%">
      <ComboBox
        accessibilityClearButtonLabel="Clear category value"
        errorMessage={errorMessage}
        id="visibleLabel"
        label="Choose a category to display top search trends"
        noResultText="No results for your selection"
        onBlur={handleOnBlur}
        onChange={resetErrorMessage}
        onClear={resetErrorMessage}
        options={options}
        placeholder="Select category"
      />
    </Box>
  );
}
