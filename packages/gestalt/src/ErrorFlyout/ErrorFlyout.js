// @flow
import * as React from 'react';
import Box from '../Box/Box';
import Controller from '../FlyoutUtils/Controller';
import Text from '../Text/Text';

type Props = {|
  anchor: ?any,
  id?: string,
  idealDirection?: 'up' | 'right' | 'down' | 'left',
  message: string,
  onDismiss: () => void,
  positionRelativeToAnchor?: boolean,
  size?: 'xs' | 'sm' | 'md' /* default sm */,
|};

export default function ErrorFlyout(props: Props) {
  const {
    anchor,
    id,
    idealDirection,
    message,
    onDismiss,
    positionRelativeToAnchor = true,
    size,
  } = props;

  if (!anchor) {
    return null;
  }

  return (
    <Controller
      anchor={anchor}
      bgColor="orange"
      idealDirection={idealDirection}
      onDismiss={onDismiss}
      positionRelativeToAnchor={positionRelativeToAnchor}
      size={size}
    >
      <Box padding={3}>
        <Text bold color="white">
          <span id={id}>{message}</span>
        </Text>
      </Box>
    </Controller>
  );
}
