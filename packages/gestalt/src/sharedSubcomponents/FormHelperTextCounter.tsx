import { Fragment, useEffect, useRef, useState } from 'react';
import Box from '../Box';
import Flex from '../Flex';
import Icon from '../Icon';
import IconCompact from '../IconCompact';
import Text from '../Text';
import { MaxLength } from '../TextField';
import useInExperiment from '../useInExperiment';

type Props = {
  maxLength: MaxLength;
  currentLength?: number;
  disabled?: boolean;
};

export default function FormHelperTextCounter({ disabled, currentLength, maxLength }: Props) {
  const ref = useRef<null | HTMLElement>(null);

  const [width, setWidth] = useState<undefined | number>(undefined);

  const isInVRExperiment = useInExperiment({
    webExperimentName: 'web_gestalt_visualrefresh',
    mwebExperimentName: 'web_gestalt_visualrefresh',
  });

  useEffect(() => {
    const containerWidth = ref?.current?.getBoundingClientRect().width;
    setWidth(containerWidth ? Math.ceil(containerWidth) : undefined);
  }, [ref]);

  const maxLengthChars = maxLength?.characterCount.toString() ?? '';

  const maxLengthReached = (currentLength ?? 0) >= (maxLength.characterCount ?? 0);

  let icon: 'workflow-status-warning' | 'workflow-status-problem' = 'workflow-status-warning';
  const iconVR: 'compact-workflow-status-warning' | 'compact-workflow-status-problem' = 'compact-workflow-status-warning';
  let textColor: 'warning' | 'error' | 'disabled' = 'warning';

  if (
    typeof currentLength === 'number' &&
    typeof maxLength?.characterCount === 'number' &&
    currentLength > maxLength?.characterCount
  ) {
    icon = 'workflow-status-problem';
    iconVR = 'compact-workflow-status-problem';
    textColor = 'error';
  }

  if (disabled) {
    textColor = 'disabled';
  }

  return (
    <Fragment>
      {/* This hidden container is used to calculate the width of the character tracker and prevent spacing changes on each input value changes */}
      <Box
        ref={ref}
        dangerouslySetInlineStyle={{ __style: { visibility: 'hidden' } }}
        position="absolute"
      >
        <Text color={disabled ? 'disabled' : 'subtle'} size="100">
          {`${maxLengthChars}/${maxLengthChars}`}
        </Text>
      </Box>
      <Flex gap={1} justifyContent="center">
        {maxLengthReached ? (
          <Fragment>
            {/* This visually hidden error message is accessible by screenreaders. It alerts the user right after the maximum length is reached. */}
            <Box display="visuallyHidden" role="alert">
              {maxLength?.errorAccessibilityLabel}
            </Box>
            <Box alignItems="center" aria-hidden display="flex" height="100%">
              {isInVRExperiment  ? (
                  <IconCompact
                  accessibilityLabel=""
                  color={textColor}
                  icon={iconVR}
                  size={12}
                />
              ) : (
                <Icon
                accessibilityLabel=""
                color={textColor}
                icon={icon}
                size={ 16}
              />
              )}
             
            </Box>
          </Fragment>
        ) : (
          <Box width={isInVRExperiment ? 12 : 16} />
        )}
        <Flex justifyContent="end" width={width}>
          <Text align="end" color={maxLengthReached || disabled ? textColor : 'subtle'} size="100">
            <Box display="visuallyHidden">,</Box>
            {`${currentLength?.toString() ?? ''}/${maxLengthChars}`}
          </Text>
        </Flex>
      </Flex>
    </Fragment>
  );
}
