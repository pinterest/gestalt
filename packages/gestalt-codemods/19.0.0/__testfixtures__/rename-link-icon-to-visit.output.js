// @flow strict
import React from 'react';
import { Box, Icon, IconButton, Pog, Button, Icon as RenamedIcon } from 'gestalt';

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
