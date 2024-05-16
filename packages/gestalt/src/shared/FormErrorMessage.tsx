import { ReactNode } from 'react';
import styles from './FormErrorMessage.css';
import Box from '../Box';
import Flex from '../Flex';
import Icon from '../Icon';
import Text from '../Text';

type SizeType = 'sm' | 'md' | 'lg';

type Props = {
  id: string;
  text?: ReactNode;
  size?: SizeType;
};

const applyDensityMargin = (size?: SizeType): 1 | 2 => (size === 'sm' || size === 'md' ? 1 : 2);
const applyDensityIcon = (size?: SizeType): 12 | 16 => (size === 'sm' ? 12 : 16);
const applyDensityGap = (size?: SizeType): 1 | 2 => (size === 'sm' ? 1 : 2);

const icon = 'workflow-status-problem';
const color = 'error';

export default function FormErrorMessage({ id, size, text = '' }: Props) {
  return (
    <Box marginTop={applyDensityMargin(size)}>
      <Text color="error" size="100">
        {/* Class used to ensure all children are font size "sm" */}
        <span className={styles.formErrorMessage} id={id}>
          {/* This error message is accessible by screenreaders. It alerts the user right when the error message is presented to the user. While error messages are visually apparent to users who can see the page, they may not be obvious to users of assistive technologies. This role="alert" provides a way to programmatically expose dynamic content changes in a way that can be announced by assistive technologies.
           */}
          <Box role="alert">
            <Flex alignItems="center" gap={applyDensityGap(size)}>
              <Icon accessibilityLabel="" color={color} icon={icon} size={applyDensityIcon(size)} />
              {text}
            </Flex>
          </Box>
        </span>
      </Text>
    </Box>
  );
}
