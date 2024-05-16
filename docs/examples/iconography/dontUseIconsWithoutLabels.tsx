import {ReactNode} from 'react';
import { Box, Icon } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Icon accessibilityLabel="sparkle" color="default" icon="sparkle" size={16} />
    </Box>
  );
}
