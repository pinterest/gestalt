import {ReactNode, useState} from 'react';
import { Box, ComboBox, Flex } from 'gestalt';

export default function Example() {
  const PRONOUNS = [
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

  const options = PRONOUNS.map((pronoun, index) => ({
    label: pronoun,
    value: `value${index}`,
  }));

  const [errorMessage, setErrorMessage] = useState<string | null | undefined>();

  const handleOnBlur = ({
    value,
  }: {
    event: React.FocusEvent<HTMLInputElement> | React.SyntheticEvent<HTMLInputElement>,
    value: string
  }) => {
    if (value !== '' && !PRONOUNS.includes(value)) setErrorMessage('Please, select a valid option');
  };

  const resetErrorMessage = errorMessage ? () => setErrorMessage() : () => {};

  return (
    <Box height="100%" padding={2} width="100%">
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <Box width={320}>
          <ComboBox
            accessibilityClearButtonLabel="Clear the current value"
            errorMessage={errorMessage}
            helperText="Choose your pronouns to appear on your profile so others know how to refer to you. You can edit or remove these any time."
            id="uncontrolled"
            label="Pronouns"
            noResultText="No results for your selection"
            onBlur={handleOnBlur}
            onChange={resetErrorMessage}
            onClear={resetErrorMessage}
            options={options}
            placeholder="Add your pronouns"
          />
        </Box>
      </Flex>
    </Box>
  );
}
