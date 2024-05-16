import {ReactNode} from 'react';
import { Box, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Text align="forceRight">
        نحن جميعًا هنا معًا في حرية . ربما للمرة الأخيرة! انا اعرف يا عزيزي؛ أعلم أنك ستكون دائمًا
        معي حتى النهاية.
      </Text>
    </Box>
  );
}
