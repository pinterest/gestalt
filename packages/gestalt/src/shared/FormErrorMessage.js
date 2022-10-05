// @flow strict
import { type Node } from 'react';
import Box from '../Box.js';
import Text from '../Text.js';
import styles from './FormErrorMessage.css';

type Props = {|
  id: string,
  text?: Node,
  addA11yPause?: boolean,
|};

export default function FormErrorMessage({ id, addA11yPause = false, text = '' }: Props): Node {
  return (
    <Box marginTop={2}>
      <Text color="error" size="100">
        {/* Class used to ensure all children are font size "sm" */}
        <span className={styles.formErrorMessage} id={`${id}-error`}>
          {addA11yPause ? <Box display="visuallyHidden">:</Box> : null}

          {text}
        </span>
      </Text>
    </Box>
  );
}
