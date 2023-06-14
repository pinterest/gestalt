// @flow strict
import { Box, Button, Icon, Icon as RenamedIcon,IconButton, Pog } from 'gestalt';

export default function TestBox() {
  return (
    <Box>
      <Icon icon='link' size={16}/>
      <IconButton icon='link'/>
      <Pog icon='link'/>
      <Button iconEnd='link'/>
      <RenamedIcon icon='link'/>
    </Box>
  );
}
