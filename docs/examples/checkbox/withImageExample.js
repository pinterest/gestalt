// @flow strict
import { type Node, useState } from 'react';
import { Box, Checkbox, Fieldset, Flex, Image } from 'gestalt';

export default function CheckboxExample(): Node {
  const [checkedCoral, setCheckedCoral] = useState(false);
  const [checkedBlue, setCheckedBlue] = useState(false);

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Fieldset legend="Which backgrounds would you like to use?" legendDisplay="hidden">
        <Flex direction="column" gap={{ column: 4, row: 0 }}>
          <Checkbox
            checked={checkedCoral}
            id="coral"
            label="Coral"
            helperText="Botanical art in coral and green"
            image={
              <Box height={100} width={80}>
                <Image
                  alt="Botanical art in coral and green"
                  src="https://i.ibb.co/7bQQYkX/stock2.jpg"
                  fit="contain"
                  naturalWidth={1}
                  naturalHeight={1}
                />
              </Box>
            }
            name="favorite art"
            onChange={({ checked }) => {
              setCheckedCoral(checked);
            }}
          />
          <Checkbox
            checked={checkedBlue}
            id="blue"
            label="Blue"
            helperText="Typography and shoe in blue"
            image={
              <Box height={100} width={80}>
                <Image
                  alt="Typography and shoe in blue"
                  src="https://i.ibb.co/jVR29XV/stock5.jpg"
                  fit="contain"
                  naturalWidth={1}
                  naturalHeight={1}
                />
              </Box>
            }
            name="favorite art"
            onChange={({ checked }) => {
              setCheckedBlue(checked);
            }}
          />
        </Flex>
      </Fieldset>
    </Box>
  );
}
