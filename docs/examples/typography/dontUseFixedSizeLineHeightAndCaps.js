// @flow strict
import { type Node } from 'react';
import { Box, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Text align="forceRight">
        نحن جميعًا هنا معًا في حرية ، ربما للمرة الأخيرة! انا اعرف يا عزيزي؛ أعلم أنك ستكون دائمًا
        معي حتى النهاية□□□□□□□□□□.
      </Text>
    </Box>
  );
}
