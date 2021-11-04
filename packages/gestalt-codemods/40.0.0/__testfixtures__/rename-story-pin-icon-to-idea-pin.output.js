// @flow strict
import { Box, Icon, IconButton, Pog, Button, Icon as RenamedIcon } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <Icon icon='idea-pin' size={16}/>
      <IconButton icon='idea-pin'/>
      <Pog icon='idea-pin'/>
      <Button iconEnd='idea-pin'/>
      <RenamedIcon icon='idea-pin'/>
    </Box>
  );
}
