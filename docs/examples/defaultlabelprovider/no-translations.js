// @flow strict
import { type Node, useState } from 'react';
import { Box, ComboBox, DefaultLabelProvider, Flex, Heading } from 'gestalt';

const pronouns = [
  'ey / em',
  'he / him',
  'ne / nem',
  'she / her',
  'they / them',
  've / ver',
  'xe / xem',
  'xie / xem',
  'zie / zem',
];

export default function Example(): Node {
  const [errorMessage, setErrorMessage] = useState<?string>();

  const handleOnBlur = ({
    value,
  }: {
    event: SyntheticFocusEvent<HTMLInputElement> | SyntheticEvent<HTMLInputElement>,
    value: string,
  }) => {
    if (value !== '' && !pronouns.includes(value)) setErrorMessage('Please, select a valid option');
  };

  const resetErrorMessage = errorMessage ? () => setErrorMessage() : () => {};

  return (
    <DefaultLabelProvider>
      <Box height="100%" marginTop={3} padding={2} width="100%">
        <Flex
          alignItems="center"
          direction="column"
          gap={5}
          height="100%"
          justifyContent="center"
          width="100%"
        >
          <Heading size="300">For apps not using internationalization</Heading>

          <Box width={320}>
            <ComboBox
              errorMessage={errorMessage}
              helperText="Choose your pronouns to appear on your profile so others know how to refer to you. You can edit or remove these any time."
              id="no-translations-combobox"
              label="Pronouns"
              noResultText="No results for your selection"
              onBlur={handleOnBlur}
              onChange={resetErrorMessage}
              onClear={resetErrorMessage}
              options={pronouns.map((pronoun, index) => ({
                label: pronoun,
                value: `value${index}`,
              }))}
              placeholder="Add your pronouns"
            />
          </Box>
        </Flex>
      </Box>
    </DefaultLabelProvider>
  );
}
