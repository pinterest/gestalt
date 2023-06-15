// @flow strict
import { type Node } from 'react';
import FormHelperTextCounter from './FormHelperTextCounter.js';
import Box from '../Box.js';
import Flex from '../Flex.js';
import Text from '../Text.js';
import { type MaxLength } from '../TextField.js';

type Props = {|
  id?: string,
  text: ?string,
  maxLength?: ?MaxLength,
  currentLength?: number,
|};

export default function FormHelperText({ id, currentLength, text, maxLength }: Props): Node {
  return (
    // id is required for all helper texts accompanying an individual form element, not for groups of form elements such as RadioGroup.
    <Box marginTop={2} id={id}>
      <Flex gap={4}>
        <Flex.Item flex="grow">
          {text ? (
            <Text color="subtle" size="100">
              {text}
            </Text>
          ) : null}
        </Flex.Item>
        {maxLength ? (
          <FormHelperTextCounter currentLength={currentLength} maxLength={maxLength} />
        ) : null}
      </Flex>
    </Box>
  );
}
