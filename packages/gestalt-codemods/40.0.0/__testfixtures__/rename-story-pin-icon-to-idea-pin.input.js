// @flow strict
import { Box, Button, Icon, Icon as RenamedIcon,IconButton, Pog } from 'gestalt';

export default function TestBox() {
  const a = true;
  return (
    <Box>
      <Icon icon='story-pin' size={16}/>
      <IconButton icon='story-pin'/>
      <Pog icon='story-pin'/>
      <Button iconEnd='story-pin'/>
      <RenamedIcon icon='story-pin'/>
      <Icon icon={ a ? 'story-pin' : 'pin'}/>
      <Icon icon={ a ? 'pin' : 'story-pin'}/>
    </Box>
  );
}
