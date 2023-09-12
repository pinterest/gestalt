// @flow strict
import { type Node, useState } from 'react';
import { Box, Image, RadioGroup } from 'gestalt';

export default function RadioButtonExample(): Node {
  const [artPreference, setArtPreference] = useState('');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <RadioGroup legend="Pick a placeholder image" id="imageExample">
        <RadioGroup.RadioButton
          checked={artPreference === 'coral'}
          id="coral"
          label="Coral"
          helperText="Botanical art in coral and green"
          image={
            <Box height={100} width={80}>
              <Image
                alt="Botanical art in coral and green"
                src="https://i.ibb.co/7bQQYkX/stock2.jpg"
                fit="cover"
                naturalWidth={1}
                naturalHeight={1}
              />
            </Box>
          }
          name="Art Preference"
          onChange={() => setArtPreference('coral')}
          value="coral"
        />
        <RadioGroup.RadioButton
          checked={artPreference === 'blue'}
          id="blue"
          label="Blue"
          helperText="Typography and shoe in blue"
          image={
            <Box height={100} width={80}>
              <Image
                alt="Typography and shoe in blue"
                src="https://i.ibb.co/jVR29XV/stock5.jpg"
                fit="cover"
                naturalWidth={1}
                naturalHeight={1}
              />
            </Box>
          }
          name="Art Preference"
          onChange={() => setArtPreference('blue')}
          value="blue"
        />
        <RadioGroup.RadioButton
          checked={artPreference === 'green'}
          id="green"
          label="Green"
          helperText="Abstract art in green"
          image={
            <Box height={100} width={80}>
              <Image
                alt="Abstract art in green"
                src="https://i.ibb.co/FY2MKr5/stock6.jpg"
                fit="cover"
                naturalWidth={1}
                naturalHeight={1}
              />
            </Box>
          }
          name="Art Preference"
          onChange={() => setArtPreference('green')}
          value="green"
        />
      </RadioGroup>
    </Box>
  );
}
