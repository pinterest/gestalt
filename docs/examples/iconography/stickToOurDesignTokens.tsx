import { Box, Icon } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box color="infoWeak" display="inlineBlock" padding={12} rounding={4}>
        <Icon accessibilityLabel="shopping bag" color="default" icon="shopping-bag" size={24} />
      </Box>
    </Box>
  );
}
