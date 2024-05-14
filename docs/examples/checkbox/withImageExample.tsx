import { useState } from 'react';
import { Box, Checkbox, Fieldset, Flex, Image } from 'gestalt';

export default function CheckboxExample() {
  const [checkedCoral, setCheckedCoral] = useState(false);
  const [checkedBlue, setCheckedBlue] = useState(false);

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Fieldset legend="Which backgrounds would you like to use?" legendDisplay="hidden">
        <Flex direction="column" gap={{ column: 4, row: 0 }}>
          <Checkbox
            checked={checkedCoral}
            helperText="Botanical art in coral and green"
            id="coral"
            image={
              <Box height={100} width={80}>
                <Image
                  alt="Botanical art in coral and green"
                  fit="contain"
                  naturalHeight={1}
                  naturalWidth={1}
                  src="https://i.ibb.co/7bQQYkX/stock2.jpg"
                />
              </Box>
            }
            label="Coral"
            name="favorite art"
            onChange={({ checked }) => {
              setCheckedCoral(checked);
            }}
          />
          <Checkbox
            checked={checkedBlue}
            helperText="Typography and shoe in blue"
            id="blue"
            image={
              <Box height={100} width={80}>
                <Image
                  alt="Typography and shoe in blue"
                  fit="contain"
                  naturalHeight={1}
                  naturalWidth={1}
                  src="https://i.ibb.co/jVR29XV/stock5.jpg"
                />
              </Box>
            }
            label="Blue"
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
