// @flow strict
import { Box, Button, Icon, Icon as RenamedIcon,IconButton, Pog } from 'gestalt';

export default function TestBox() {
  const a = true;
  return (
    <Box>
      <Icon icon='idea-pin' size={16}/>
      <IconButton icon='idea-pin'/>
      <Pog icon='idea-pin'/>
      <Button iconEnd='idea-pin'/>
      <RenamedIcon icon='idea-pin'/>
      <Icon icon={ a ? 'idea-pin' : 'pin'}/>
      <Icon icon={ a ? 'pin' : 'idea-pin'}/>
    </Box>
  );
}
