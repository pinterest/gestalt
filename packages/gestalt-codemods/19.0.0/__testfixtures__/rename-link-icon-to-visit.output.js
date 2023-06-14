// @flow strict
import { Box, Button, Icon, Icon as RenamedIcon,IconButton, Pog } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <Icon icon='visit' size={16}/>
      <IconButton icon='visit'/>
      <Pog icon='visit'/>
      <Button iconEnd='visit'/>
      <RenamedIcon icon='visit'/>
    </Box>
  );
}
