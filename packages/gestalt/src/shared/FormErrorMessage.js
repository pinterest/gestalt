// @flow strict
import { type Node as ReactNode } from 'react';
import styles from './FormErrorMessage.css';
import Box from '../Box';
import Flex from '../Flex';
import Status from '../Status';
import Text from '../Text';

type Props = {
  id: string,
  text?: ReactNode,
};

export default function FormErrorMessage({ id, text = '' }: Props): ReactNode {
  return (
    <Box marginTop={2}>
      <Text color="error" size="100">
        {/* Class used to ensure all children are font size "sm" */}
        <span className={styles.formErrorMessage} id={id}>
          {/* This error message is accessible by screenreaders. It alerts the user right when the error message is presented to the user. While error messages are visually apparent to users who can see the page, they may not be obvious to users of assistive technologies. This role="alert" provides a way to programmatically expose dynamic content changes in a way that can be announced by assistive technologies.
           */}
          <Box role="alert">
            <Flex gap={2}>
              <Status type="problem" />
              {text}
            </Flex>
          </Box>
        </span>
      </Text>
    </Box>
  );
}
