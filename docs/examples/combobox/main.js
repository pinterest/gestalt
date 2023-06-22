// @flow strict
import { type Node, useState } from 'react';
import { ComboBox, Flex } from 'gestalt';

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

  const [errorMessage, setErrorMessage] = useState<?string>();

  const handleOnBlur = ({
    value,
  }: {|
    event: SyntheticFocusEvent<HTMLInputElement> | SyntheticEvent<HTMLInputElement>,
    value: string,
  |}) => {
    if (value !== '' && !PRONOUNS.includes(value)) setErrorMessage('Please, select a valid option');
  };

  const resetErrorMessage = errorMessage ? () => setErrorMessage() : () => {};

  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
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
    </Flex>
  );
}
