// @flow strict
import { Box, Icon, IconButton, Pog, Button, Icon as RenamedIcon } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <Icon icon='story-pin' size={16}/>
      <IconButton icon='story-pin'/>
      <Pog icon='story-pin'/>
      <Button iconEnd='story-pin'/>
      <RenamedIcon icon='story-pin'/>
    </Box>
  );
}
