import { useState } from 'react';
import { Flex, RadioGroup, TextField } from 'gestalt';

export default function Example() {
  const [favorite, setFavorite] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <form>
        <Flex direction="column" gap={4}>
          <TextField
            id="name"
            label="Name"
            onChange={({ value }) => setName(value)}
            placeholder="First and last name"
            value={name}
          />
          <TextField
            id="email"
            label="Email"
            onChange={({ value }) => setEmail(value)}
            placeholder="example@test.com"
            type="email"
            value={email}
          />
          <RadioGroup id="pet" legend="Favorite pet">
            <Flex direction="column" gap={2}>
              <RadioGroup.RadioButton
                checked={favorite === 'dogs'}
                id="favoriteDogA11y"
                label="Dogs"
                name="favorite"
                onChange={() => setFavorite('dogs')}
                value="dogs"
              />
              <RadioGroup.RadioButton
                checked={favorite === 'cats'}
                id="favoriteCatA11y"
                label="Cats"
                name="favorite"
                onChange={() => setFavorite('cats')}
                value="cats"
              />
              <RadioGroup.RadioButton
                checked={favorite === 'plants'}
                id="favoritePlantsA11y"
                label="Plants"
                name="favorite"
                onChange={() => setFavorite('plants')}
                value="plants"
              />
            </Flex>
          </RadioGroup>
        </Flex>
      </form>
    </Flex>
  );
}
