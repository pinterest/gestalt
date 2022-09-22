// @flow strict
import { type Node } from 'react';
import Box from './Box.js';
import Flex from './Flex.js';
import Text from './Text.js';
import FormHelperTextCounter from './FormHelperTextCounter.js';

import { type MaxLength } from './TextField.js';

type Props = {|
  text: ?string,
  maxLength?: ?MaxLength,
  currentLength?: number,
  addA11yPause?: boolean,
|};

export default function FormHelperText({
  currentLength,
  text,
  maxLength,
  addA11yPause = false,
}: Props): Node {
  return (
    <Box marginTop={2}>
      <Flex gap={4}>
        <Flex.Item flex="grow">
          {text ? (
            <Text color="subtle" size="100">
              {addA11yPause ? <Box display="visuallyHidden">:</Box> : null}
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
