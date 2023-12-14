// @flow strict
import { type Node as ReactNode } from 'react';
import FormHelperTextCounter from './FormHelperTextCounter';
import Box from '../Box';
import Flex from '../Flex';
import Text from '../Text';
import { type MaxLength } from '../TextField';

type SizeType = 'sm' | 'md' | 'lg';

type Props = {
  id?: string,
  text: ?string,
  maxLength?: ?MaxLength,
  currentLength?: number,
  size?: SizeType,
};

const applyDensityMargin = (size?: SizeType): 1 | 2 => (size === 'sm' || size === 'md' ? 1 : 2);

export default function FormHelperText({
  id,
  currentLength,
  text,
  maxLength,
  size,
}: Props): ReactNode {
  return (
    // id is required for all helper texts accompanying an individual form element, not for groups of form elements such as RadioGroup.
    <Box marginTop={applyDensityMargin(size)} id={id}>
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
