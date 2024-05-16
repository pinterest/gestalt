import { ReactNode, useState } from 'react';
import { Box, Image, RadioGroup } from 'gestalt';

export default function RadioButtonExample() {
  const [artPreference, setArtPreference] = useState('');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <RadioGroup id="imageExample" legend="Pick a placeholder image">
        <RadioGroup.RadioButton
          checked={artPreference === 'coral'}
          helperText="Botanical art in coral and green"
          id="coral"
          image={
            <Box height={100} width={80}>
              <Image
                alt="Botanical art in coral and green"
                fit="cover"
                naturalHeight={1}
                naturalWidth={1}
                src="https://i.ibb.co/7bQQYkX/stock2.jpg"
              />
            </Box>
          }
          label="Coral"
          name="Art Preference"
          onChange={() => setArtPreference('coral')}
          value="coral"
        />
        <RadioGroup.RadioButton
          checked={artPreference === 'blue'}
          helperText="Typography and shoe in blue"
          id="blue"
          image={
            <Box height={100} width={80}>
              <Image
                alt="Typography and shoe in blue"
                fit="cover"
                naturalHeight={1}
                naturalWidth={1}
                src="https://i.ibb.co/jVR29XV/stock5.jpg"
              />
            </Box>
          }
          label="Blue"
          name="Art Preference"
          onChange={() => setArtPreference('blue')}
          value="blue"
        />
        <RadioGroup.RadioButton
          checked={artPreference === 'green'}
          helperText="Abstract art in green"
          id="green"
          image={
            <Box height={100} width={80}>
              <Image
                alt="Abstract art in green"
                fit="cover"
                naturalHeight={1}
                naturalWidth={1}
                src="https://i.ibb.co/FY2MKr5/stock6.jpg"
              />
            </Box>
          }
          label="Green"
          name="Art Preference"
          onChange={() => setArtPreference('green')}
          value="green"
        />
      </RadioGroup>
    </Box>
  );
}
