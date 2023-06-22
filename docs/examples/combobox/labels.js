// @flow strict
import { type Node, useState } from 'react';
import { Box, ComboBox, Flex, Heading, Link, Text } from 'gestalt';

export default function Example(): Node {
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

  const [errorMessage, setErrorMessage] = useState<?string>();

  const handleOnBlur = ({
    value,
  }: {|
    event: SyntheticFocusEvent<HTMLInputElement> | SyntheticEvent<HTMLInputElement>,
    value: string,
  |}) => {
    if (value !== '' && !CATEGORIES.includes(value))
      setErrorMessage('Please, select a valid option');
  };

  const resetErrorMessage = errorMessage ? () => setErrorMessage() : () => {};

  return (
    <Box padding={2}>
      <Flex direction="column" gap={4}>
        <Heading size="500">
          Discover this week`&apos;`s top searched trends across all categories
        </Heading>
        <Text inline>
          Wanna learn how trends work?
          <Text weight="bold" inline>
            {' '}
            Read{' '}
            <Link
              accessibilityLabel="Learn how trends on Pinterest work"
              target="blank"
              display="inlineBlock"
              href="https://business.pinterest.com/content/pinterest-predicts/"
            >
              {' '}
              additional information
            </Link>
          </Text>
        </Text>
        <Flex width="100%" justifyContent="center">
          <Box width={320}>
            <ComboBox
              accessibilityClearButtonLabel="Clear category value"
              errorMessage={errorMessage}
              id="displayLabel"
              label="Choose a category to display top search trends"
              labelDisplay="hidden"
              noResultText="No results for your selection"
              onBlur={handleOnBlur}
              onChange={resetErrorMessage}
              onClear={resetErrorMessage}
              options={options}
              placeholder="Select category"
            />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
