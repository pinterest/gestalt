import { Fragment, useEffect, useRef, useState } from 'react';
import Box from '../Box';
import Flex from '../Flex';
import Status from '../Status';
import Text from '../Text';
import { MaxLength } from '../TextField';

type Props = {
  maxLength: MaxLength;
  currentLength?: number;
};

export default function FormHelperTextCounter({ currentLength, maxLength }: Props) {
  const ref = useRef<null | HTMLElement>(null);
  const [width, setWidth] = useState<undefined | number>(undefined);

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
        ref={ref}
        dangerouslySetInlineStyle={{ __style: { visibility: 'hidden' } }}
        position="absolute"
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
              {/* @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'StatusType'. */}
              <Status accessibilityLabel="" type={status} />
            </Box>
          </Fragment>
        ) : (
          <Box width={16} />
        )}
        <Flex justifyContent="end" width={width}>
          {/* @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"link" | "warning" | "error" | "default" | "subtle" | "success" | "shopping" | "inverse" | "light" | "dark" | undefined'. */}
          <Text align="end" color={maxLengthReached ? textColor : 'subtle'} size="100">
            <Box display="visuallyHidden">,</Box>
            {`${currentLength?.toString() ?? ''}/${maxLengthChars}`}
          </Text>
        </Flex>
      </Flex>
    </Fragment>
  );
}
