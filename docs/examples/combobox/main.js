// @flow strict
import { useState, type Node } from 'react';
import { Box, ComboBox } from 'gestalt';

export default function Example(): Node {
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

  const options = PRONOUNS.map((pronoun, index) => ({ label: pronoun, value: `value${index}` }));

  const [errorMessage, setErrorMessage] = useState();

  const handleOnBlur = ({ value }) => {
    if (value !== '' && !PRONOUNS.includes(value)) setErrorMessage('Please, select a valid option');
  };

  const resetErrorMessage = errorMessage ? () => setErrorMessage() : () => {};

  return (
    <Box width="100%" height="100%" padding={4}>
      <ComboBox
        accessibilityClearButtonLabel="Clear the current value"
        errorMessage={errorMessage}
        helperText="Choose your pronouns to appear on your profile so others know how to refer to you. You can edit or remove these any time."
        id="header"
        label="Pronouns"
        noResultText="No results for your selection"
        onBlur={handleOnBlur}
        onChange={resetErrorMessage}
        onClear={resetErrorMessage}
        options={options}
        placeholder="Add your pronouns"
      />
    </Box>
  );
}
