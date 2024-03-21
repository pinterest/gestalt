// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Box, Flex, RadioGroup } from 'gestalt';

export default function RadioButtonExample(): ReactNode {
  const [favorite, setFavorite] = useState('');
  const [favoriteFood, setFavoriteFood] = useState('');

  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex gap={8} wrap>
        <RadioGroup id="directionExample-1" legend="What is your favorite pet?">
          <RadioGroup.RadioButton
            checked={favorite === 'dogs'}
            id="favoriteDog"
            label="Dogs"
            name="favorite"
            onChange={() => setFavorite('dogs')}
            value="dogs"
          />
          <RadioGroup.RadioButton
            checked={favorite === 'cats'}
            id="favoriteCat"
            label="Cats"
            name="favorite"
            onChange={() => setFavorite('cats')}
            value="cats"
          />
          <RadioGroup.RadioButton
            checked={favorite === 'plants'}
            id="favoritePlants"
            label="Plants"
            name="favorite"
            onChange={() => setFavorite('plants')}
            value="plants"
          />
        </RadioGroup>

        <RadioGroup
          direction="row"
          errorMessage="Please select one"
          id="directionExample"
          legend="What is your favorite snack?"
        >
          <RadioGroup.RadioButton
            checked={favoriteFood === 'pizza'}
            id="favoritePizza"
            label="Pizza"
            name="favoriteFood"
            onChange={() => setFavoriteFood('pizza')}
            value="pizza"
          />
          <RadioGroup.RadioButton
            checked={favoriteFood === 'curry'}
            id="favoriteCurry"
            label="Curry"
            name="favoriteFood"
            onChange={() => setFavoriteFood('curry')}
            value="curry"
          />
          <RadioGroup.RadioButton
            checked={favoriteFood === 'sushi'}
            id="favoriteSushi"
            label="Sushi"
            name="favoriteFood"
            onChange={() => setFavoriteFood('sushi')}
            value="sushi"
          />
        </RadioGroup>
      </Flex>
    </Box>
  );
}
