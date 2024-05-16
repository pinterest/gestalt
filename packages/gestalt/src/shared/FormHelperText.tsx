import {ReactNode} from 'react';
import FormHelperTextCounter from './FormHelperTextCounter';
import Box from '../Box';
import Flex from '../Flex';
import Text from '../Text';
import { MaxLength } from '../TextField';

type SizeType = "sm" | "md" | "lg";

type Props = {
  id?: string,
  text: string | null | undefined,
  maxLength?: MaxLength | null | undefined,
  currentLength?: number,
  size?: SizeType
};

const applyDensityMargin = (size?: SizeType): 1 | 2 => (size === 'sm' || size === 'md' ? 1 : 2);

export default function FormHelperText(
  {
    id,
    currentLength,
    text,
    maxLength,
    size,
  }: Props,
) {
  return (
    // id is required for all helper texts accompanying an individual form element, not for groups of form elements such as RadioGroup.
    (<Box id={id} marginTop={applyDensityMargin(size)}>
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
    </Box>)
  );
}
