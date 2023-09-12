// @flow strict
import { type Node, useState } from 'react';
import { Box, Flex, RadioGroup } from 'gestalt';

export default function RadioButtonExample(): Node {
  const [favorite, setFavorite] = useState('');
  const [favoriteFood, setFavoriteFood] = useState('');

  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex gap={{ column: 0, row: 8 }}>
        <RadioGroup
          legend="What is your favorite snack?"
          errorMessage="Please select one"
          id="sizeExample"
        >
          <RadioGroup.RadioButton
            checked={favorite === 'pizza'}
            id="favoriteSizePizzaSm"
            label="Pizza"
            name="favoriteFoodSm"
            onChange={() => setFavorite('pizza')}
            value="pizza"
            size="sm"
          />
          <RadioGroup.RadioButton
            checked={favorite === 'curry'}
            id="favoriteSizeCurrySm"
            label="Curry"
            name="favoriteFoodSm"
            onChange={() => setFavorite('curry')}
            value="curry"
            size="sm"
          />
          <RadioGroup.RadioButton
            checked={favorite === 'sushi'}
            id="favoriteSizeSushiSm"
            label="Sushi"
            name="favoriteFoodSm"
            onChange={() => setFavorite('sushi')}
            value="sushi"
            size="sm"
          />
        </RadioGroup>

        <RadioGroup
          legend="What is your favorite snack?"
          errorMessage="Please select one"
          id="sizeExampleMd"
        >
          <RadioGroup.RadioButton
            checked={favoriteFood === 'pizza'}
            id="favoriteSizePizza"
            label="Pizza"
            name="favoriteFood-size"
            onChange={() => setFavoriteFood('pizza')}
            value="pizza"
          />
          <RadioGroup.RadioButton
            checked={favoriteFood === 'curry'}
            id="favoriteSizeCurry"
            label="Curry"
            name="favoriteFood-size"
            onChange={() => setFavoriteFood('curry')}
            value="curry"
          />
          <RadioGroup.RadioButton
            checked={favoriteFood === 'sushi'}
            id="favoriteSizeSushi"
            label="Sushi"
            name="favoriteFood-size"
            onChange={() => setFavoriteFood('sushi')}
            value="sushi"
          />
        </RadioGroup>
      </Flex>
    </Box>
  );
}
