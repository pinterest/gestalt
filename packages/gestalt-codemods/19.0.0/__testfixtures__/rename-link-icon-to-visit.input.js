// @flow strict
import { Box, Icon, IconButton, Pog, Button, Icon as RenamedIcon } from 'gestalt';

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
