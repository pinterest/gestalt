// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Fieldset, Flex, RadioButton, TextField } from 'gestalt';

export default function Example(): ReactNode {
  const [favorite, setFavorite] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <form>
        <Flex direction="column" gap={4}>
          <TextField
            id="name"
            onChange={({ value }) => setName(value)}
            placeholder="First and last name"
            label="Name"
            value={name}
          />
          <TextField
            id="email"
            onChange={({ value }) => setEmail(value)}
            placeholder="example@test.com"
            label="Email"
            value={email}
            type="email"
          />
          <Fieldset legend="Favorite pet">
            <Flex direction="column" gap={2}>
              <RadioButton
                checked={favorite === 'dogs'}
                id="favoriteDogA11y"
                label="Dogs"
                name="favorite"
                onChange={() => setFavorite('dogs')}
                value="dogs"
              />
              <RadioButton
                checked={favorite === 'cats'}
                id="favoriteCatA11y"
                label="Cats"
                name="favorite"
                onChange={() => setFavorite('cats')}
                value="cats"
              />
              <RadioButton
                checked={favorite === 'plants'}
                id="favoritePlantsA11y"
                label="Plants"
                name="favorite"
                onChange={() => setFavorite('plants')}
                value="plants"
              />
            </Flex>
          </Fieldset>
        </Flex>
      </form>
    </Flex>
  );
}
