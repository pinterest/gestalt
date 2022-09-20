// @flow strict
import { Fragment, useRef, useEffect, useState, type Node } from 'react';
import Box from './Box.js';
import Flex from './Flex.js';
import Status from './Status.js';
import Text from './Text.js';
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
  const ref = useRef();
  const [width, setWidth] = useState(undefined);

  useEffect(() => {
    const containerWidth = ref?.current?.getBoundingClientRect().width;
    setWidth(containerWidth ? Math.ceil(containerWidth) : undefined);
  }, [ref]);

  const maxLengthChars = maxLength?.maxLengthChar.toString() ?? '';

  const maxLengthExceeded = (currentLength ?? 0) >= (maxLength?.maxLengthChar ?? 0);

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
          <Fragment>
            <Box
              position="absolute"
              dangerouslySetInlineStyle={{ __style: { visibility: 'hidden' } }}
              ref={ref}
            >
              <Text color="subtle" size="100">
                {`${maxLengthChars}/${maxLengthChars}`}
              </Text>
            </Box>
            <Flex gap={1}>
              {maxLengthExceeded ? (
                <Fragment>
                  <Box display="visuallyHidden" aria-live="assertive" role="alert">
                    {maxLength?.errorAccessibilityLabel}
                  </Box>
                  <Status type="problem" accessibilityLabel={maxLength?.errorAccessibilityLabel} />
                </Fragment>
              ) : (
                <Box width={16} />
              )}
              <Flex width={width} justifyContent="end">
                <Text color={maxLengthExceeded ? 'error' : 'subtle'} size="100" align="end">
                  {`${currentLength?.toString() ?? ''}/${maxLengthChars}`}
                </Text>
              </Flex>
            </Flex>
          </Fragment>
        ) : null}
      </Flex>
    </Box>
  );
}
