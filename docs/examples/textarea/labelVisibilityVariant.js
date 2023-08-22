// @flow strict
import { type Node } from "react";
import { Flex, Text, TextArea, Box } from "gestalt";

export default function Example(): Node {
    return <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
    <Flex gap={{ column: 2, row: 0 }} direction="column" width="100%">
      <Text weight="bold" size="300">About me</Text>
      <TextArea
        id="textareaexampleHiddenLabel"
        placeholder="Write something about yourself..."
        onChange={() => {}}
        label='About me'
        labelDisplay="hidden"
        size='lg'
      />
    </Flex>
    </Box>;
}
