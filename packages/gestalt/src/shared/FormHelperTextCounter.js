// @flow strict
import { Fragment, useRef, useEffect, useState, type Node } from 'react';
import Box from '../Box.js';
import Flex from '../Flex.js';
import Status from '../Status.js';
import Text from '../Text.js';
import { type MaxLength } from '../TextField.js';

type Props = {|
  maxLength: MaxLength,
  currentLength?: number,
|};

export default function FormHelperTextCounter({ currentLength, maxLength }: Props): Node {
  const ref = useRef<null | HTMLElement>(null);
  const [width, setWidth] = useState<void | number>(undefined);

  useEffect(() => {
    const containerWidth = ref?.current?.getBoundingClientRect().width;
    setWidth(containerWidth ? Math.ceil(containerWidth) : undefined);
  }, [ref]);

  const maxLengthChars = maxLength?.characterCount.toString() ?? '';

  const maxLengthReached = (currentLength ?? 0) >= (maxLength.characterCount ?? 0);

  let status = 'warning';
  let textColor = 'warning';

  if (
    typeof currentLength === 'number' &&
    typeof maxLength?.characterCount === 'number' &&
    currentLength > maxLength?.characterCount
  ) {
    status = 'problem';
    textColor = 'error';
  }

  return (
    <Fragment>
      {/* This hidden container is used to calculate the width of the character tracker and prevent spacing changes on each input value changes */}
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
        {maxLengthReached ? (
          <Fragment>
            {/* This visually hidden error message is accessible by screenreaders. It alerts the user right after the maximum length is reached. */}
            <Box display="visuallyHidden" role="alert">
              {maxLength?.errorAccessibilityLabel}
            </Box>
            <Box aria-hidden>
              <Status type={status} accessibilityLabel="" />
            </Box>
          </Fragment>
        ) : (
          <Box width={16} />
        )}
        <Flex width={width} justifyContent="end">
          <Text color={maxLengthReached ? textColor : 'subtle'} size="100" align="end">
            <Box display="visuallyHidden">,</Box>
            {`${currentLength?.toString() ?? ''}/${maxLengthChars}`}
          </Text>
        </Flex>
      </Flex>
    </Fragment>
  );
}
